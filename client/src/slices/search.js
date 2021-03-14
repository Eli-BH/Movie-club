import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//A slice for a single Movie Pages

const initialState = {
  loading: false,
  hasError: false,
  searchResults: [],
};

const searchResultsSlice = createSlice({
  name: "singleMovie",
  initialState,
  reducers: {
    getSearchResults: (state) => {
      state.loading = true;
    },
    getSearchResultsSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.searchResults = payload;
    },
    getSearchFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//actions from slice
export const {
  getSearchResults,
  getSearchResultsSuccess,
  getSearchResultsFailure,
} = searchResultsSlice.actions;

//A selector
export const searchResultsSelector = (state) => state.searchResults;

//reducer
export default searchResultsSlice.reducer;

//Thunk
export function fetchSearchResults(query) {
  return async (dispatch) => {
    dispatch(getSearchResults());
    try {
      query = query.replacAll(" ", "%20");
      const url = `https://api.themoviedb.org/3/search/movie?api_key=0ca4f16446cc1bca4c690abae99b5e52&language=en-US&query=${query}&include_adult=false`;
      const response = await axios.get(url);
      const { data } = response;
      dispatch(getSearchResultsSuccess(data));
    } catch (error) {
      dispatch(getSearchResultsFailure());
      console.log(error);
    }
  };
}
