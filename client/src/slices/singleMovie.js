import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for a single Movie Page

const initialState = {
  loading: false,
  hasError: false,
  movie: {},
};

const singleMovieSlice = createSlice({
  name: "singleMovie",
  initialState,
  reducers: {
    getSingleMovie: (state) => {
      state.loading = true;
    },
    getSingleMovieSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.singleMovie = payload;
    },
    getSingleMovieFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//actions from slice
export const {
  getSingleMovie,
  getSingleMovieSuccess,
  getSingleMovieFailure,
} = singleMovieSlice.actions;

//A selector
export const singleMovieSelector = (state) => state.singleMovie;

//reducer
export default singleMovieSlice.reducer;

//Thunk
export function fetchSingleMove(id) {
  return async (dispatch) => {
    dispatch(getSingleMovie());

    try {
      const url = `https:///api.themoviedb.org/3/movie/${id}`;

      const response = await axios.get(url);
      const { data } = response;
      dispatch(getSingleMovieSuccess(data));
    } catch (error) {
      dispatch(getSingleMovieFailure());
    }
  };
}
