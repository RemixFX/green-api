import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IError } from "../../models/globalErrors";
import { IUserMessage } from "../../models/requestData";

export interface messagesState {
  messages: IUserMessage[];
  loading: boolean;
  error: IError;
}

const initialState: messagesState = {
  messages: [],
  loading: false,
  error: { isError: false, message: '' }
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    dataFetching: state => {
      state.loading = true
      state.error = initialState.error
    },
    dataFetchingSuccess: (state, action: PayloadAction<IUserMessage>) => {
      state.messages = [...state.messages, action.payload]
      state.loading = false
      state.error = initialState.error
    },
    dataFetchingError: (state, action: PayloadAction<IError>) => {
      state.loading = false
      state.error = action.payload
    },
  }
})