import React, { useEffect } from "react";
import JumbotronComponent from "../components/JumbotronComponent";
import Spinner from "react-bootstrap/Spinner";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingMovies, trendingSelector } from "../slices/trending";
import {
  fetchWeekTrending,
  weekTrendingSelector,
} from "../slices/weekTrending";
import {
  fetchTrendingPeople,
  trendingPeopleSelector,
} from "../slices/trendingPeople";

import TrendingSlider from "../components/TrendingSlider";
import TrailerSlider from "../components/TrailerSlider";

const HomePage = () => {
  //redux functions
  const dispatch = useDispatch();
  const { trendingMovies, loading } = useSelector(trendingSelector);
  const { weekTrending, weekLoading = loading } = useSelector(
    weekTrendingSelector
  );
  const { trendingPeople, peopleLoading = loading } = useSelector(
    trendingPeopleSelector
  );

  const images = [];
  //This array holds object of the popular videos {name:String name, link: youtube link}

  useEffect(() => {
    dispatch(fetchTrendingMovies());
    //hasErrors ?? console.log(hasErrors);
    dispatch(fetchWeekTrending());
    dispatch(fetchTrendingPeople());
  }, [dispatch]);

  if (trendingMovies.results) {
    for (let i = 0; i < 3; i++) {
      images.push(trendingMovies.results[i]);
    }
  }

  return loading ? (
    <div style={{ width: 33, marginRight: "auto", marginLeft: "auto" }}>
      <Spinner animation="border">
        <span className="sr-only">Loading</span>
      </Spinner>
    </div>
  ) : (
    <div className="homepage">
      <JumbotronComponent images={images} />
      <>
        <TrendingSlider
          items={trendingMovies.results}
          sliderId="1"
          today={true}
        />
      </>

      <div className=" trending-slider-container">
        <TrendingSlider
          items={weekTrending.results}
          sliderId="2"
          loading={weekLoading}
          week={true}
        />
      </div>
      <div className=" my-5">
        <TrailerSlider />
      </div>
      <div className="trending-slider-container">
        <TrendingSlider
          items={trendingPeople.results}
          sliderId="3"
          loading={peopleLoading}
          person
        />
      </div>
    </div>
  );
};

export default HomePage;
