import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import contactsReducer from "./contacts";

const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
