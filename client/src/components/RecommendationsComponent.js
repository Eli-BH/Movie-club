import React from "react";

import { Link } from "react-router-dom";

const RecommendationsComponent = ({ singleMovie }) => {
  return singleMovie.recommendations ? (
    <div>
      <h1>Recommendations</h1>
      <div className="recommendations">
        {singleMovie.recommendations.results.map((item) => {
          return (
            <div key={item.id} className="recommendations-container">
              <Link to={`/movie/${item.id}`}>
                <img
                  className="recommendations-img"
                  src={`http://www.themoviedb.org/t/p/original${item.poster_path}`}
                  alt={item.title}
                />
                <p>{`${item.title}`}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default RecommendationsComponent;
