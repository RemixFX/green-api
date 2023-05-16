import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from './reducers/userSlice';
import { contactsSlice } from "./reducers/contactsSlice";
import { messagesSlice } from "./reducers/messagesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    contacts: contactsSlice.reducer,
    messages: messagesSlice.reducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
