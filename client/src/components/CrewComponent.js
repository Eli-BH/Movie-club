import React from "react";

const CrewComponent = ({ singleMovie }) => {
  return (
    <div>
      <div className="cc-title-container">
        <div id="cc-title">
          <h2>Top Billed Crew</h2>
        </div>
      </div>

      <div className="movie-page-cast-slider mt-4" id="mp-cast-slider">
        {singleMovie.credits.crew
          .filter((item) => item.profile_path)
          .slice(0, 30)
          .map((item, index) => {
            return (
              <div key={index} className="movie-page-cast-img p-1">
                <img
                  src={`https://www.themoviedb.org/t/p/original${item.profile_path}`}
                  alt={item.name}
                />
                <p>
                  <b>{item.name}</b>
                </p>

                <p>{item.department}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CrewComponent;
