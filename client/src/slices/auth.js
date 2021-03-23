import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for authorization

const initialState = {
  loading: false,
  hasErrors: false,
  authData: {},
};

const authLoginSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.authData = payload;
    },
    loadingFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    signUp: (state) => {
      state.loading = true;
      state.hasErrors = false;
    },
    signUpSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.authData = payload;
    },

    logout: (state) => {
      localStorage.removeItem("profile");
      state.authData = {};
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  logout,
} = authLoginSlice.actions;

export const authLoginSelector = (state) => state.authData;

//reducer
export default authLoginSlice.reducer;

//Thunk
export function authLogin(formData, history) {
  return async (dispatch) => {
    dispatch(login());
    try {
      const { data } = await axios.post(
        "http://localhost:5000/users/signin",
        formData
      );

      dispatch(loginSuccess(data));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
}

export function authSignUp(formData, history) {
  return async (dispatch) => {
    dispatch(signUp());
    try {
      const { data } = await axios.post(
        "http://localhost:5000/users/signup",
        formData
      );

      dispatch(signUpSuccess(data));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
}
