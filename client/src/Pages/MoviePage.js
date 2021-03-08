import React from "react";

const MoviePage = ({ match }) => {
  return <div>{`Movie Page for ${match.params.id}`}</div>;
};

export default MoviePage;
