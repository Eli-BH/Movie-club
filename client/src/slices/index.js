import { combineReducers } from "redux";

import trendingReducer from "./trending";
import weekTrendingReducer from "./weekTrending";
import trendingPeopleReducer from "./trendingPeople";
import trailersReducer from "./trailers";
import singleMovieReducer from "./singleMovie";
import searchResultsReducer from "./search";
import authReducer from "./auth";
import userInfoReducer from "./userInfo";
import userActionsReducer from "./userActions";
import actorReducer from "./actor";
import chatReducer from "./chat";

const rootReducer = combineReducers({
  trendingMovies: trendingReducer,
  weekTrending: weekTrendingReducer,
  trendingPeople: trendingPeopleReducer,
  trailers: trailersReducer,
  singleMovie: singleMovieReducer,
  searchResults: searchResultsReducer,
  auth: authReducer,
  userInfo: userInfoReducer,
  userActions: userActionsReducer,
  actor: actorReducer,
  chat: chatReducer,
});

export default rootReducer;
