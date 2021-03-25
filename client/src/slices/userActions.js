//A slice for user actions
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  hasError: false,
  actionResponse: null,
};

const userActionSlice = createSlice({
  name: "userActions",
  initialState,
  reducers: {
    like: (state) => {
      state.loading = true;
      state.hasError = false;
    },
    likeSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.actionResponse = payload;
    },
    likeFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    collect: (state) => {
      state.loading = true;
      state.hasError = false;
    },
    collectSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.actionResponse = payload;
    },
    collectFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//exported actions
export const {
  like,
  likeSuccess,
  likeFailure,
  collect,
  collectFailure,
  collectSuccess,
} = userActionSlice.actions;

//exported reducers
export default userActionSlice.reducer;

//selector
export const userActionSelector = (state) => state.userActions;

//thunk

export function addLike(id, movie) {
  return async (dispatch) => {
    dispatch(like(movie));

    try {
      const { data } = await axios.patch(
        `http://localhost:3001/users/like/${id}`,
        movie
      );
      dispatch(like(data));
    } catch (error) {
      dispatch(likeFailure());
      console.log(error);
    }
  };
}

export function addToCollection(movie) {
  return async (dispatch) => {
    dispatch(collect(movie));

    try {
    } catch (error) {
      dispatch(collectFailure());
      console.log(error);
    }
  };
}
