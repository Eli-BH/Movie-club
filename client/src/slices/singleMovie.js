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
export function fetchSingleMovie(id) {
  return async (dispatch) => {
    dispatch(getSingleMovie());

    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=0ca4f16446cc1bca4c690abae99b5e52&language=en-US&append_to_response=similar,videos,recommendations,images,credits,alternative_titles,release_dates`;
      const response = await axios.get(url);
      const { data } = response;
      dispatch(getSingleMovieSuccess(data));
    } catch (error) {
      dispatch(getSingleMovieFailure());
    }
  };
}
