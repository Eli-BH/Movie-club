//A slice for user actions
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  hasError: false,
  actionResponse: {},
  responseData: {},
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
    addComment: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    addCommentSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.actionResponse = payload;
    },
    addCommentFailure: (state) => {
      state.loading = false;
      state.hasError = false;
    },
    getComments: (state) => {
      state.loading = true;
      state.hasError = false;
    },
    getCommentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.responseData = payload;
    },
    getCommentsFailure: (state) => {
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
  addComment,
  addCommentSuccess,
  addCommentFailure,
  getComments,
  getCommentsSuccess,
  getCommentsFailure,
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
        `https://movie-club-server.herokuapp.com/users/like/${id}`,
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

export function addCommentThunk(movieId, movieObj) {
  return async (dispatch) => {
    dispatch(addComment());

    try {
      const { data } = axios.post(
        `https://movie-club-server.herokuapp.com/users/comment/${movieId}`,
        movieObj
      );

      dispatch(addCommentSuccess(data));
    } catch (error) {
      dispatch(addCommentFailure());
      console.log(error);
    }
  };
}

export function getCommentsThunk(movieId) {
  return async (dispatch) => {
    dispatch(getComments());

    try {
      const { data } = await axios.get(
        `https://movie-club-server.herokuapp.com/users/comment/${movieId} `
      );

      console.log(data);
      dispatch(getCommentsSuccess(data));
    } catch (error) {
      dispatch(getCommentsFailure());
      console.log(error);
    }
  };
}
