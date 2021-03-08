import React from "react";

const PopularTrailersSlider = ({ videos, loading }) => {
  console.log(videos);
  return videos ? (
    <div>
      {videos &&
        videos.map((vid, index) => {
          return <h4 key={index}>{vid.name}</h4>;
        })}
    </div>
  ) : (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default PopularTrailersSlider;
