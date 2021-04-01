import React from "react";
import { Link } from "react-router-dom";
import { BsCaretLeftFill } from "react-icons/bs";
import { BsCaretRightFill } from "react-icons/bs";

const TrendingSlider = ({ items, sliderId, person, today, week }) => {
  const handleLeft = () => {
    document.querySelector(".list-container" + sliderId).scrollLeft -= 1000;
  };
  const handleRight = () => {
    document.querySelector(".list-container" + sliderId).scrollLeft += 1000;
  };

  return items ? (
    <>
      <div className="scroll-list">
        <div className="title-container">
          {today && <h2 className="trending-title">Trending Today</h2>}
          {week && <h2 className="trending-title">Trending this week</h2>}
          {person && <h2 className="trending-title">Trending Actors</h2>}
        </div>

        <div className="full">
          <button
            onClick={handleLeft}
            className="slides"
            id="sliderBtnL marquee-button"
          >
            <BsCaretLeftFill />
          </button>

          {person ? (
            <div className={`list-container${sliderId} list-container`}>
              {items.map((item) => {
                return (
                  <Link to={`/actor/${item.id}`}>
                    <div className="mr-5 list-item" key={item.name}>
                      <img
                        src={`https://www.themoviedb.org/t/p/original${item.profile_path}`}
                        alt={item.name}
                      />

                      <p>{item.name}</p>
                    </div>
                  </Link>
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

          <button
            onClick={handleRight}
            className="slides"
            id="sliderBtnR marquee-button"
          >
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </>
  ) : (
    <div>Error</div>
  );
};

export default TrendingSlider;
