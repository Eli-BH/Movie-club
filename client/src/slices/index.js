import { combineReducers } from "redux";

import trendingReducer from "./trending";
import weekTrendingReducer from "./weekTrending";
import trendingPeopleReducer from "./trendingPeople";
import trailersReducer from "./trailers";
import singleMovieReducer from "./singleMovie";

const rootReducer = combineReducers({
  trendingMovies: trendingReducer,
  weekTrending: weekTrendingReducer,
  trendingPeople: trendingPeopleReducer,
  trailers: trailersReducer,
  singleMovie: singleMovieReducer,
});

export default rootReducer;
