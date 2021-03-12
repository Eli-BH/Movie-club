import React from "react";
import { useSelector, useDispatch } from "react-redux";

const MoviePage = ({ match }) => {
  const dispatch = useDispatch();

  return <div>{`Movie Page for ${match.params.id}`}</div>;
};

export default MoviePage;
