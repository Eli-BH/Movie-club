import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_YOUTUBE_KEY } = process.env;

//A slice fpr trending people this week
const initialState = {
  loading: false,
  hasError: false,
  trailers: [],
};

const trailersSlice = createSlice({
  name: "trailers",
  initialState,
  reducers: {
    getTrailers: (state) => {
      state.loading = true;
    },
    getTrailersSuccess: (state, { payload }) => {
      state.trailers = payload;
      state.loading = false;
      state.hasError = false;
    },
    getTrailersFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//actions from slice
export const {
  getTrailers,
  getTrailersSuccess,
  getTrailersFailure,
} = trailersSlice.actions;

//selector
export const trailersSelector = (state) => state.trailers;

//reducer
export default trailersSlice.reducer;

//Thunk
export function fetchTrailers() {
  return async (dispatch) => {
    dispatch(getTrailers());

    try {
      let url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=20&playlistId=PLRDnnvx-4xZ1W6tj38Fun0sZPnTaf1JgW&key=${REACT_APP_YOUTUBE_KEY}`;
      const { data } = await axios({
        method: "get",
        url,
        headers: {
          Accept: "application/json",
        },
      });

      dispatch(getTrailersSuccess([data]));
    } catch (error) {
      dispatch(getTrailersFailure());
      //Remove for prod
      console.log(error);
    }
  };
}
