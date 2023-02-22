import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer/reducer";
import chatSlice from "./ChatReducer/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatSlice,
  },
});
