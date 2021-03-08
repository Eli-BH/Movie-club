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
import {
  fetchPopularVideos,
  popularVideosSelector,
} from "../slices/popularVideos";
import TrendingSlider from "../components/TrendingSlider";
import axios from "axios";
import PopularTrailersSlider from "../components/PopularTrailersSlider";

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

  const { popularVideos, popularVideosloading = loading } = useSelector(
    popularVideosSelector
  );

  const images = [];
  //This array holds object of the popular videos {name:String name, link: youtube link}
  const videos = [];

  useEffect(() => {
    dispatch(fetchTrendingMovies());
    //hasErrors ?? console.log(hasErrors);
    dispatch(fetchWeekTrending());
    dispatch(fetchTrendingPeople());
    dispatch(fetchPopularVideos());
  }, [dispatch]);

  if (trendingMovies.results) {
    for (let i = 0; i < 3; i++) {
      images.push(trendingMovies.results[i]);
    }
  }
  if (popularVideos.results) {
    for (const item in popularVideos.results) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${popularVideos.results[item].id}/videos?api_key=0ca4f16446cc1bca4c690abae99b5e52`
        )
        .then(({ data }) => {
          videos.push({
            name: popularVideos.results[item].original_title,
            backdrop: `https://www.themoviedb.org/t/p/original${popularVideos.results[item].backdrop_path}`,
            link: `https://youtube.com/watch?v=${data.results[0].key}`,
          });
        })
        .catch((err) => console.log(err));
    }
    console.log(videos);
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
      <div className="container trending-slider-container">
        <h2>Trending Today</h2>
        <TrendingSlider items={trendingMovies.results} sliderId="1" />
      </div>

      <div className="container trending-slider-container">
        <h2>Trending this week</h2>
        <TrendingSlider
          items={weekTrending.results}
          sliderId="2"
          loading={weekLoading}
        />
      </div>

      <div className="container trending-slider-container">
        <h2>Trending Actors</h2>
        <TrendingSlider
          items={trendingPeople.results}
          sliderId="3"
          loading={peopleLoading}
          person
        />
      </div>

      <div className="container-md popular-slider-container mt-5">
        <h2>Popular Trailers</h2>
        <div
          style={{
            padding: 150,
            backgroundColor: "aqua",
            marginBottom: 50,
            borderRadius: 15,
          }}
        >
          <PopularTrailersSlider
            videos={videos}
            loading={popularVideosloading}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
