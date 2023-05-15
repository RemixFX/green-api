import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../models/requestData";
import { IError } from "../../models/globalErrors";

export interface userState {
  userData: IUserData;
  loading: boolean;
  error: IError;
}

const initialState: userState = {
  userData: { idInstance: '', apiTokenInstance: ''},
  loading: false,
  error: { isError: false, message: '' }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    dataFetching: state => {
      state.userData = initialState.userData
      state.loading = true
      state.error = initialState.error
    },
    dataFetchingSuccess: (state, action: PayloadAction<IUserData>) => {
      state.userData = action.payload
      state.loading = false
      state.error = initialState.error
    },
    dataFetchingError: (state, action: PayloadAction<IError>) => {
      state.userData = initialState.userData
      state.loading = false
      state.error = action.payload
    },
  }
})