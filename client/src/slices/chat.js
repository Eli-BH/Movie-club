import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for the chat components

const initialState = {
  loading: false,
  hasError: false,
  chatData: {},
  chatMessageList: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChat: (state) => {
      state.loading = true;
    },
    getChatSuccess: (state, { payload }) => {
      state.loading = false;
      state.hadError = false;
      state.chatData = payload;
    },
    getChatFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    sendMessage: (state) => {
      state.loading = true;
    },
    sendMessageSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.chatMessageList = payload;
    },
    sendMessageFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//actions
export const {
  getChat,
  getChatSuccess,
  getChatFailure,
  sendMessage,
  sendMessageFailure,
  sendMessageSuccess,
} = chatSlice.actions;

//A selector
export const chatSelector = (state) => state.chat;

//reducer
export default chatSlice.reducer;

//Thunk
export function fetchChat(room) {
  return async (dispatch) => {
    dispatch(getChat());

    try {
      const url = `https://movie-club-server.herokuapp.com/chat/connect`;
      const { data } = await axios.post(url, { name: room });
      dispatch(getChatSuccess(data));
    } catch (error) {
      dispatch(getChatFailure());
    }
  };
}

export function newMessage(content) {
  return async (dispatch) => {
    dispatch(getChat());

    try {
      const url = `https://movie-club-server.herokuapp.com/chat/message`;
      const { data } = await axios.post(url, content);
      dispatch(sendMessageSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(sendMessageFailure());
    }
  };
}
