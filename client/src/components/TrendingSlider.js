import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";

const TrendingSlider = ({ movies }) => {
  console.log(movies);

  const handleLeft = () => {
    document.querySelector(".list-container").scrollLeft -= 1000;
  };
  const handleRight = () => {
    document.querySelector(".list-container").scrollLeft += 1000;
  };

  return movies ? (
    <div className="scroll-list">
      <div className="full">
        <button onClick={handleLeft} id="marquee-button">
          {" "}
          {"<"}
        </button>
        <div className="list-container">
          {movies.map((movie) => {
            return (
              <div className="mr-5 list-item">
                <img
                  src={`https://www.themoviedb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  style={{ maxHeight: 275 }}
                />
                <p>{movie.original_title}</p>
              </div>
            );
          })}
        </div>
        <button onClick={handleRight} id="marquee-button">
          {">"}
        </button>
      </div>
    </div>
  ) : (
    <div>Error</div>
  );
};

export default TrendingSlider;
