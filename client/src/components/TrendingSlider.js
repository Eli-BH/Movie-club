import React from "react";
import { Link } from "react-router-dom";

const TrendingSlider = ({ items, sliderId, person }) => {
  const handleLeft = () => {
    document.querySelector(".list-container" + sliderId).scrollLeft -= 1000;
  };
  const handleRight = () => {
    document.querySelector(".list-container" + sliderId).scrollLeft += 1000;
  };

  return items ? (
    <div className="scroll-list">
      <div className="full">
        <button onClick={handleLeft} id="marquee-button">
          {"<"}
        </button>
        {person ? (
          <div className={`list-container${sliderId} list-container`}>
            {items.map((item) => {
              return (
                <div className="mr-5 list-item" key={item.name}>
                  <Link to={`/actor/${item.id}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${item.profile_path}`}
                      alt={item.name}
                      style={{ maxHeight: 275 }}
                    />

                    <p>{item.name}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`list-container${sliderId} list-container`}>
            {items.map((item) => {
              return (
                <div className="mr-5 list-item" key={item.id}>
                  <Link to={`/movie/${item.id}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/original${item.poster_path}`}
                      alt={item.title}
                      style={{ maxHeight: 275 }}
                    />

                    <p>{item.original_title}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

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
