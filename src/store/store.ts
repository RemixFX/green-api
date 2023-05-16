import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from './reducers/userSlice';
import { contactsSlice } from "./reducers/contactsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    contacts: contactsSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
