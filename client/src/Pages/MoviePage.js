import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { singleMovieSelector, fetchSingleMovie } from "../slices/singleMovie";
import { Row, Col } from "react-bootstrap";

import {
  addCommentThunk,
  addLike,
  getCommentsThunk,
  userActionSelector,
} from "../slices/userActions";
import { userInfoSelector } from "../slices/userInfo";

import axios from "axios";
import MoviePageBannerComponent from "../components/MoviePageBannerComponent";
import CastComponent from "../components/CastComponent";
import CrewComponent from "../components/CrewComponent";
import MoviePageExtrasComponent from "../components/MoviePageExtrasComponent";
import RecommendationsComponent from "../components/RecommendationsComponent";
import StatsComponent from "../components/StatsComponent";
import WatchProviders from "../components/WatchProviders";

const MoviePage = ({ match }) => {
  const [watchProviders, setWatchProviders] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [comments, setComments] = useState({});

  const dispatch = useDispatch();
  const id = match.params.id;

  const { loading, singleMovie } = useSelector(singleMovieSelector);

  const { userInfo } = useSelector(userInfoSelector);

  //user selector
  //slice for user actions
  //favorite
  //rating
  //favorite button
  //rate stars
  //comment section
  //chat section

  //in the usermodel, add objects for the movie edit information

  console.log(comments);

  useEffect(() => {
    dispatch(fetchSingleMovie(id));
    const response = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=0ca4f16446cc1bca4c690abae99b5e52`
        )
        .then(({ data }) => {
          setWatchProviders(data.results.US);
        })
        .catch((err) => console.log(err));
    };

    response();

    const comments = () =>
      axios.get(`http://localhost:3001/users/comment/${id}`).then((res) => {
        setComments(res.data.reverse());
      });

    comments();
  }, [dispatch, id]);

  const handleLike = () => {
    const movieInfo = {
      id: singleMovie?.id,
      title: singleMovie?.original_title,
      image: singleMovie?.poster_path,
    };

    dispatch(addLike(userInfo?._id, movieInfo));

    setLiked(true);
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const commentObj = {
      movieId: singleMovie?.id,
      userId: user?.id,
      userName: user?.username,
      comment,
    };
    await axios.post(`http://localhost:3001/users/comment/${id}`, commentObj);

    const comments = () =>
      axios
        .get(`http://localhost:3001/users/comment/${id}`)
        .then(({ data }) => {
          setComments(data.reverse());
        });

    comments();
    setComment("");
  };

  console.log(watchProviders);
  console.log(singleMovie);

  return singleMovie ? (
    <div>
      {" "}
      {loading && <div>{loading}</div>}
      {
        <MoviePageBannerComponent
          singleMovie={singleMovie}
          handleLike={handleLike}
        />
      }
      <div className=" movie-page-container">
        <Row className=" movie-page-divider">
          <Col lg={8} sm={12} className="movie-page-left mt-5 mb-2">
            <div>
              <CastComponent singleMovie={singleMovie} />
            </div>

            <div>
              <CrewComponent singleMovie={singleMovie} />
            </div>

            <div className="movie-page-media my-5">
              {
                <MoviePageExtrasComponent
                  comments={comments}
                  comment={comment}
                  handleComment={handleComment}
                  singleMovie={singleMovie}
                  setComment={setComment}
                />
              }
            </div>

            {singleMovie.recommendations.results.length > 0 && (
              <div>
                <RecommendationsComponent singleMovie={singleMovie} />
              </div>
            )}
          </Col>

          <Col lg={4} sm={12} className="movie-page-right  mt-5 mb-2">
            <div className="movie-stats">
              <StatsComponent singleMovie={singleMovie} />

              <WatchProviders watchProviders={watchProviders} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MoviePage;
