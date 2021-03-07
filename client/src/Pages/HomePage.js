import React, { useEffect } from "react";
import JumbotronComponent from "../components/JumbotronComponent";
import Spinner from "react-bootstrap/Spinner";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingMovies, trendingSelector } from "../slices/trending";

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
    </div>
  );
};

export default HomePage;
