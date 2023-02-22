import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "ChatUser",
  initialState: {
    allUser: [],
    allMessage: [],
  },
  reducers: {
    saveAllUser(state, action) {
      state.allUser.push(action.payload);
    },
    newMessage(state, action) {
      state.allMessage.push(action.payload);
    },
  },
});

export const { saveAllUser, newMessage } = chatSlice.actions;

export default chatSlice.reducer;
