import React, { useEffect } from "react";
import JumbotronComponent from "../components/JumbotronComponent";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingMovies, trendingSelector } from "../slices/trending";
import TrendingSlider from "../components/TrendingSlider";

const HomePage = () => {
  const dispatch = useDispatch();
  const { trendingMovies, loading } = useSelector(trendingSelector);
  const images = [];

  useEffect(() => {
    dispatch(fetchTrendingMovies());
    //hasErrors ?? console.log(hasErrors);
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
      <div className="container">
        <h2>Trending Today</h2>
        <TrendingSlider movies={trendingMovies.results} />
      </div>
    </div>
  );
};

export default HomePage;
