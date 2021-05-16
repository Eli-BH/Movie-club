import React from "react";

const RecommendationsComponent = ({ singleMovie }) => {
  return singleMovie.recommendations ? (
    <div>
      <div className="rec-title-container">
        <div className="rec-title">
          <h1>Recommendations</h1>
        </div>
      </div>

      <div className="recommendations">
        {singleMovie.recommendations.results.map((item) => {
          return (
            <div key={item.id} className="recommendations-container">
              <a href={`/movie/${item.id}`}>
                <img
                  className="recommendations-img"
                  src={`http://www.themoviedb.org/t/p/original${item.poster_path}`}
                  alt={item.title}
                />
                <p>{`${item.title}`}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default RecommendationsComponent;
