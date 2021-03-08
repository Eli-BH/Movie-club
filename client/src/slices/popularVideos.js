import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for trending people this week

const initialState = {
  loading: false,
  hasError: false,
  popularVideos: [],
};

const popularVideosSlice = createSlice({
  name: "popularVideos",
  initialState,
  reducers: {
    getPopularVideos: (state) => {
      state.loading = true;
    },
    getPopularVideosSuccess: (state, { payload }) => {
      state.popularVideos = payload;
      state.loading = false;
      state.hasError = false;
    },
    getPopularVideosFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//action from slice
//optional export
export const {
  getPopularVideos,
  getPopularVideosFailure,
  getPopularVideosSuccess,
} = popularVideosSlice.actions;

//selector
export const popularVideosSelector = (state) => state.popularVideos;

//reducer
export default popularVideosSlice.reducer;

//Thunk
export function fetchPopularVideos() {
  return async (dispatch) => {
    dispatch(getPopularVideos());

    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=0ca4f16446cc1bca4c690abae99b5e52"
      );
      const { data } = res;
      dispatch(getPopularVideosSuccess(data));
    } catch (error) {
      dispatch(getPopularVideosFailure());
      console.log(error);
    }
  };
}
