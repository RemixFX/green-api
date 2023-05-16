import { getContactInfo, getStateInstance, sendMessage } from "../../api/api";
import { IMessageWithUserData, IUserContact, IUserData, IUserMessage } from "../../models/requestData";
import { AppDispatch } from "../store";
import { contactsSlice } from "./contactsSlice";
import { messagesSlice } from "./messagesSlice";
import { userSlice } from "./userSlice";

// Проверка авторизации
export const fetchUserAuthorization = ({ idInstance, apiTokenInstance }: IUserData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.dataFetching())
    const response: { stateInstance: string } = await getStateInstance({ idInstance, apiTokenInstance })
    switch (response.stateInstance) {
      case 'authorized':
        return dispatch(userSlice.actions.dataFetchingSuccess({ idInstance, apiTokenInstance }))
      case 'notAuthorized':
        return dispatch(userSlice.actions.dataFetchingError({
          isError: true,
          message: `Аккаунт не авторизован. Для авторизации аккаунта воспользуйтесь инструкцией https://green-api.com/docs/before-start/#qr`
        }))
      case 'blocked':
        return dispatch(userSlice.actions.dataFetchingError({
          isError: true,
          message: `Данный аккаунт забанен`
        }))
      case 'sleepMode':
        return dispatch(userSlice.actions.dataFetchingError({
          isError: true,
          message: `Аккаунт ушел в спящий режим. Состояние возможно, когда выключен телефон.`
        }))
      case 'starting':
        return dispatch(userSlice.actions.dataFetchingError({
          isError: true,
          message: `Аккаунт в процессе запуска (сервисный режим). Может потребоваться до 5 минут`
        }))
    }
  } catch {
    dispatch(userSlice.actions.dataFetchingError({
      isError: true,
      message: `IdInstance или ApiTokenInstance указан неверно`
    }))
  }
}

// Проверка контакта и его сохранение
export const fetchUserContact = ({idInstance, apiTokenInstance}: IUserData, chatId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(contactsSlice.actions.dataFetching())
    const response: IUserContact = await getContactInfo({idInstance, apiTokenInstance}, chatId)
    const contact = {...response, chatId: response.chatId.slice(0, 11)}
    console.log(contact)
    dispatch(contactsSlice.actions.dataFetchingSuccess(contact))
  } catch {
    dispatch(contactsSlice.actions.dataFetchingError({
      isError: true, message: 'Неверно указан номер контакта, формат должен быть в виде: 71234567890'
    }))
  }
}

// Отправка и сохранение сообщений

export const fetchMessage = ({...props}: IMessageWithUserData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(messagesSlice.actions.dataFetching())
    const response: IUserMessage = await sendMessage({...props})
    dispatch(messagesSlice.actions.dataFetchingSuccess({...response, message: props.message}))
  } catch {
    dispatch(messagesSlice.actions.dataFetchingError({
      isError: true, message: 'Не удалось отправить сообщение'
    }))
  }
}