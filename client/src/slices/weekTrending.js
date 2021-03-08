import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for trending movies this week

const initialState = {
  loading: false,
  hasErrors: false,
  weekTrending: [],
};

const weekTrendingSlice = createSlice({
  name: "trendingThisWeek",
  initialState,
  reducers: {
    getWeekTrending: (state) => {
      state.loading = true;
    },
    getWeekTrendingSuccess: (state, { payload }) => {
      state.weekTrending = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getWeekTrendingFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

//actions from slice
//optional export
export const {
  getWeekTrending,
  getWeekTrendingSuccess,
  getWeekTrendingFailure,
} = weekTrendingSlice.actions;

//A selector
export const weekTrendingSelector = (state) => state.weekTrending;

//reducer
export default weekTrendingSlice.reducer;

//Thunk

export function fetchWeekTrending() {
  return async (dispatch) => {
    dispatch(getWeekTrending());

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=0ca4f16446cc1bca4c690abae99b5e52"
      );
      const { data } = response;

      dispatch(getWeekTrendingSuccess(data));
    } catch (error) {
      dispatch(getWeekTrendingFailure());
      console.log(error);
    }
  };
}
