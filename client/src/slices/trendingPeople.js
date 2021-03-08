import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for trending people this week

const initialState = {
  loading: false,
  hasError: false,
  trendingPeople: [],
};

const trendingPeopleSlice = createSlice({
  name: "trendingPeople",
  initialState,
  reducers: {
    getTrendingPeople: (state) => {
      state.loading = true;
    },
    getTrendingPeopleSuccess: (state, { payload }) => {
      state.trendingPeople = payload;
      state.loading = false;
      state.hasError = false;
    },
    getTrendingPeopleFailure: (state) => {
      state.loading = false;
      state.hasError = false;
    },
  },
});

//actions from slice
//optional export
export const {
  getTrendingPeople,
  getTrendingPeopleSuccess,
  getTrendingPeopleFailure,
} = trendingPeopleSlice.actions;

//A selector
export const trendingPeopleSelector = (state) => state.trendingPeople;

//reducer
export default trendingPeopleSlice.reducer;

//Thunk
export function fetchTrendingPeople() {
  return async (dispatch) => {
    dispatch(getTrendingPeople());

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/person/week?api_key=0ca4f16446cc1bca4c690abae99b5e52"
      );
      const { data } = response;

      dispatch(getTrendingPeopleSuccess(data));
    } catch (error) {
      dispatch(getTrendingPeopleFailure());
      console.log(error);
    }
  };
}
