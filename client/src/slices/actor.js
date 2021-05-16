import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  hasError: false,
  actorData: {},
};

const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {
    getActorInfo: (state) => {
      state.loading = true;
    },
    getActorInfoSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.actorData = payload;
    },
    getActorInfoFailure: (state) => {
      state.loading = false;
      state.hasError = false;
    },
  },
});

//actions
export const { getActorInfo, getActorInfoSuccess, getActorInfoFailure } =
  actorSlice.actions;

//reducers
export default actorSlice.reducer;

//selector
export const actorSelector = (state) => state.actor;

//Thunk
export function fetchActorInfo(id) {
  return async (dispatch) => {
    dispatch(getActorInfo());

    try {
      const url = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&append_to_response=combined_credits,external_ids,images,tagged_images`;
      const { data } = await axios.get(url);
      dispatch(getActorInfoSuccess(data));
    } catch (error) {
      dispatch(getActorInfoFailure());
    }
  };
}
