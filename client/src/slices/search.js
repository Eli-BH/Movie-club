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
    getSearchResultsFailure: (state) => {
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
export function fetchSearchResults(query, page = 1) {
  return async (dispatch) => {
    dispatch(getSearchResults());
    try {
      if (query.includes(" ")) query = query.replaceAll(" ", "%20");

      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${query}&include_adult=false&page=${page}`;
      const response = await axios.get(url);
      const { data } = response;
      dispatch(getSearchResultsSuccess(data));
    } catch (error) {
      dispatch(getSearchResultsFailure());
      console.log(error);
    }
  };
}
