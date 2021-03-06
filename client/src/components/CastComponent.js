import React from "react";
import { Link } from "react-router-dom";

const CastComponent = ({ singleMovie }) => {
  return (
    <div>
      <div className="cc-title-container">
        <div id="cc-title">
          <h2>Top Billed Cast</h2>
        </div>
      </div>

      <div className="movie-page-cast-slider my-4" id="mp-cast-slider">
        {singleMovie.credits.cast
          //.filter((item) => item.profile_path)
          .slice(0, 20)
          .map((item) => {
            return (
              <Link to={`/actor/${item.id}`}>
                <div key={item.name} className="movie-page-cast-img p-1">
                  <img
                    src={
                      item.profile_path
                        ? `https://www.themoviedb.org/t/p/original${item.profile_path}`
                        : `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`
                    }
                    alt={item.name}
                  />
                  <h5 id="name">
                    <b>{item.name}</b>
                  </h5>

                  <p id="character">{item.character}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default CastComponent;
