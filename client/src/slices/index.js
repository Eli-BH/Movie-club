import { combineReducers } from "redux";

import trendingReducer from "./trending";
import weekTrendingReducer from "./weekTrending";
import trendingPeopleReducer from "./trendingPeople";
import trailersReducer from "./trailers";
import singleMovieReducer from "./singleMovie";
import searchResultsReducer from "./search";

const rootReducer = combineReducers({
  trendingMovies: trendingReducer,
  weekTrending: weekTrendingReducer,
  trendingPeople: trendingPeopleReducer,
  trailers: trailersReducer,
  singleMovie: singleMovieReducer,
  searchResults: searchResultsReducer,
});

export default rootReducer;
