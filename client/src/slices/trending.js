import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// A slice for trending movies

const initialState = {
  loading: false,
  hasErrors: false,
  trendingMovies: [],
};

const trendingSlice = createSlice({
  name: "trendingMovies",
  initialState,
  reducers: {
    getTrending: (state) => {
      state.loading = true;
    },
    getTrendingSuccess: (state, { payload }) => {
      state.trendingMovies = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getTrendingFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

//Tree actions generated from the slice
export const {
  getTrending,
  getTrendingSuccess,
  getTrendingFailure,
} = trendingSlice.actions;

//A selector

export const trendingSelector = (state) => state.trendingMovies;

//The reducer
export default trendingSlice.reducer;

//Asynchronous thunk actions
export function fetchTrendingMovies() {
  return async (dispatch) => {
    dispatch(getTrending());

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=0ca4f16446cc1bca4c690abae99b5e52"
      );
      const { data } = response;

      dispatch(getTrendingSuccess(data));
    } catch (error) {
      dispatch(getTrendingFailure());
      console.log(error);
    }
  };
}
