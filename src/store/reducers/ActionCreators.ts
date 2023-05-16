import { getContactInfo, getStateInstance } from "../../api/api";
import { IUserContact, IUserData } from "../../models/requestData";
import { AppDispatch } from "../store";
import { contactsSlice } from "./contactsSlice";
import { userSlice } from "./userSlice";

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

export const fetchUserContact = ({idInstance, apiTokenInstance}: IUserData, chatId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(contactsSlice.actions.dataFetching())
    const response: IUserContact = await getContactInfo({idInstance, apiTokenInstance}, chatId)
    dispatch(contactsSlice.actions.dataFetchingSuccess(response))
  } catch {
    dispatch(contactsSlice.actions.dataFetchingError({
      isError: true, message: 'Неверно указан номер контакта, формат должен быть в виде: 71234567890'
    }))
  }
}