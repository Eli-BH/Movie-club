import { combineReducers } from "redux";

import trendingReducer from "./trending";

const rootReducer = combineReducers({
  trendingMovies: trendingReducer,
});

export default rootReducer;
