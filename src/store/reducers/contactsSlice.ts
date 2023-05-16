import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IError } from "../../models/globalErrors";
import { IUserContact } from "../../models/requestData";

export interface contactsState {
  contacts: IUserContact[];
  loading: boolean;
  error: IError;
}

const initialState: contactsState = {
  contacts: [],
  loading: false,
  error: { isError: false, message: '' }
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    dataFetching: state => {
      state.contacts = initialState.contacts
      state.loading = true
      state.error = initialState.error
    },
    dataFetchingSuccess: (state, action: PayloadAction<IUserContact>) => {
      state.contacts = [...state.contacts, action.payload]
      state.loading = false
      state.error = initialState.error
    },
    dataFetchingError: (state, action: PayloadAction<IError>) => {
      state.contacts = initialState.contacts
      state.loading = false
      state.error = action.payload
    },
  }
})