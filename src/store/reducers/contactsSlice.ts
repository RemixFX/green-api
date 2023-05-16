import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IError } from "../../models/globalErrors";
import { IUserContact } from "../../models/requestData";

export interface contactsState {
  contacts: IUserContact[];
  loading: boolean;
  error: IError;
  isOpenContactForm: boolean;
}

const initialState: contactsState = {
  contacts: [],
  loading: false,
  error: { isError: false, message: '' },
  isOpenContactForm: false
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    dataFetching: state => {
      state.loading = true
      state.error = initialState.error
      state.isOpenContactForm = true
    },
    dataFetchingSuccess: (state, action: PayloadAction<IUserContact>) => {
      state.contacts = [...state.contacts, action.payload]
      state.loading = false
      state.error = initialState.error
      state.isOpenContactForm = false
    },
    dataFetchingError: (state, action: PayloadAction<IError>) => {
      state.loading = false
      state.error = action.payload
      state.isOpenContactForm = true
    },
  }
})