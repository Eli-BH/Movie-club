import { combineReducers } from "redux";

import trendingReducer from "./trending";
import weekTrendingReducer from "./weekTrending";
import trendingPeopleReducer from "./trendingPeople";
import popularVideosReducer from "./popularVideos";

const rootReducer = combineReducers({
  trendingMovies: trendingReducer,
  weekTrending: weekTrendingReducer,
  trendingPeople: trendingPeopleReducer,
  popularVideos: popularVideosReducer,
});

export default rootReducer;
