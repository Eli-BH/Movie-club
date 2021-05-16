import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for authorization

const initialState = {
  loading: false,
  hasError: false,
  authData: {},
};

const authLoginSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.authData = payload;
      localStorage.setItem("profile", JSON.stringify({ ...payload }));
    },
    loadingFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    signUp: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.authData = payload;
      localStorage.setItem("profile", JSON.stringify({ ...payload }));
    },
    signUpFailure: (state, { payload }) => {
      state.loading = false;
      state.hasError = payload;
    },

    logout: (state) => {
      localStorage.clear();
      state.authData = { ...state, authData: null };
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

export const authSelector = (state) => state.authSlice;

//reducer
export default authLoginSlice.reducer;

//Thunk
export function authLogin(formData, history) {
  return async (dispatch) => {
    dispatch(login());
    try {
      const { data } = await axios.post(
        "https://movie-club-server.herokuapp.com/users/signin",
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
        "https://movie-club-server.herokuapp.com/users/signup",
        formData
      );

      dispatch(signUpSuccess(data));
      history.push("/");
    } catch (error) {
      dispatch(signUpFailure(error?.response?.data));
    }
  };
}
