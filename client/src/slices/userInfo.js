import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  hasError: false,
  userInfo: {},
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserInfo: (state) => {
      state.loading = true;
      state.hasError = false;
    },
    getUserInfoSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.userInfo = payload;
    },
    getUserInfoFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//actions
export const {
  getUserInfo,
  getUserInfoFailure,
  getUserInfoSuccess,
} = userInfoSlice.actions;

//selector
export const userInfoSelector = (state) => state.userInfo;

//reducer
export default userInfoSlice.reducer;

//thunk
export function fetchUserInfo(userId) {
  return async (dispatch) => {
    dispatch(getUserInfo());

    try {
      const { data } = await axios.get(
        `http://localhost:3001/users/profile/${userId}`
      );

      dispatch(getUserInfoSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(getUserInfoFailure());
    }
  };
}
