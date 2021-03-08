import React from "react";

const ActorPage = ({ match }) => {
  return <div>{`Actor Params for ${match.params.id}`}</div>;
};

export default ActorPage;
