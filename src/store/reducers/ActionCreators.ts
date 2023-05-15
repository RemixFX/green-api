import { getStateInstance } from "../../api/api";
import { IUserData } from "../../models/requestData";
import { AppDispatch } from "../store";
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
  } catch (error: any) {
    dispatch(userSlice.actions.dataFetchingError({
      isError: true,
      message: `IdInstance или ApiTokenInstance указан неверно`
    }))
  }
}