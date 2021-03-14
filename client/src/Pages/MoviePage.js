import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { singleMovieSelector, fetchSingleMovie } from "../slices/singleMovie";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";

const MoviePage = ({ match }) => {
  const [watchProviders, setWatchProviders] = useState(null);
  const dispatch = useDispatch();
  const id = match.params.id;
  const { loading, singleMovie } = useSelector(singleMovieSelector);

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

    console.log(response());
  }, [dispatch, id]);
  console.log(watchProviders);
  console.log(singleMovie);
  const handleRedirect = (local) => {
    switch (local) {
      case "Apple iTunes":
        window.location.href = " https://www.apple.com/itunes/";
        break;
      case "Netflix":
        window.location.href = "https://netflix.com";
        break;
      case "Google Play Movies":
        window.location.href =
          "https://play.google.com/store/movies?hl=en_US&gl=US";
        break;
      case "Amazon Video":
        window.location.href =
          "https://www.amazon.com/Prime-Video/b?node=2676882011";
        break;
      case "YouTube":
        window.location.href = "youtube.com";
        break;
      case "Vudu":
        window.location.href = "https://www.vudu.com/";
        break;
      case "Microsoft Store":
        window.location.href = "https://www.microsoft.com/en-us/movies-and-tv";
        break;
      case "Redbox":
        window.location.href = "redbox.com";
        break;
      case "DIRECTV":
        window.location.href = "https://www.directv.com/movies";
        break;
      default:
        return;
    }
  };

  return singleMovie ? (
    <div>
      {" "}
      {loading && <div>{loading}</div>}
      {
        <div
          className="movie-banner-container"
          style={{
            background:
              document.body.clientWidth > 450
                ? `linear-gradient(
            126deg,
            rgba(2, 0, 36, 0.8) 0%,
            rgba(39, 9, 121, 0.8) 35%,
            rgba(0, 17, 124, 0.8) 100%
          ),url(https://www.themoviedb.org/t/p/original${singleMovie.backdrop_path})`
                : null,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: "auto",
          }}
        >
          <div className="movie-banner-backing"></div>
          <div
            id="movie-banner-poster-container"
            style={{
              background:
                document.body.clientWidth < 450
                  ? `linear-gradient(
            126deg,
            rgba(2, 0, 36, 0.5) 0%,
            rgba(39, 9, 121, 0.5) 35%,
            rgba(0, 17, 124, 0.5) 100%
          ),url(https://www.themoviedb.org/t/p/original${singleMovie.backdrop_path})`
                  : "",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImageWidth: "auto",
            }}
          >
            <img
              src={`https://www.themoviedb.org/t/p/original${singleMovie.poster_path}`}
              alt={singleMovie.title}
              className="movie-banner-poster"
            />
          </div>

          <div className="movie-banner-text">
            <div>
              <h1>{singleMovie.title}</h1>
            </div>
            <div className="movie-banner-genres">
              <p>{singleMovie.release_date.replaceAll("-", "/")}</p>
              <div className="dropdown">
                <div className="dropbtn">Genres</div>
                <div className="dropdown-content">
                  {singleMovie.genres
                    ? singleMovie.genres.map((item, index) => {
                        return <p key={index}>{item.name} </p>;
                      })
                    : null}
                </div>
              </div>

              <p>{singleMovie.runtime} minutes</p>
            </div>

            <div className="movie-banner-overview">
              <p>
                <i>{singleMovie.tagline}</i>
              </p>

              <h3>Overview</h3>
              <p>{singleMovie.overview}</p>
            </div>

            <div className="movie-banner-cast">
              <div className="movie-banner-cast-item">
                <h6>{singleMovie.credits.cast[0].name}</h6>
                <p>{singleMovie.credits.cast[0].known_for_department}</p>
              </div>
              <div className="movie-banner-cast-item">
                <h6>
                  {
                    singleMovie.credits.crew.filter(
                      (item) => item.known_for_department === "Directing"
                    )[0]?.name
                  }
                </h6>
                <p>Director</p>
              </div>
            </div>
          </div>
        </div>
      }
      <div className=" movie-page-container">
        <Row className=" movie-page-divider">
          <Col lg={8} sm={12} className="movie-page-left mt-5 mb-2">
            <div>
              <h2>Top Billed Cast</h2>
              <div className="movie-page-cast-slider mt-4" id="mp-cast-slider">
                {singleMovie.credits.cast
                  .filter((item) => item.profile_path)
                  .slice(0, 20)
                  .map((item) => {
                    return (
                      <div key={item.name} className="movie-page-cast-img">
                        <img
                          src={`https://www.themoviedb.org/t/p/original${item.profile_path}`}
                          alt={item.name}
                        />
                        <p>
                          <b>{item.name}</b>
                        </p>

                        <p>{item.character}</p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div>
              <h2>Top Billed Crew</h2>
              <div className="movie-page-cast-slider mt-4" id="mp-cast-slider">
                {singleMovie.credits.crew
                  .filter((item) => item.profile_path)
                  .slice(0, 30)
                  .map((item, index) => {
                    return (
                      <div key={index} className="movie-page-cast-img">
                        <img
                          src={`https://www.themoviedb.org/t/p/original${item.profile_path}`}
                          alt={item.name}
                        />
                        <p>
                          <b>{item.name}</b>
                        </p>

                        <p>{item.department}</p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="movie-page-media my-5">
              {
                <div>
                  <h2>Media</h2>
                  <Tabs defaultActiveKey="videos">
                    <Tab eventKey="videos" title="Videos">
                      <div className="container m-3 media-videos">
                        {singleMovie.videos ? (
                          singleMovie.videos.results.map((item) => {
                            return (
                              <div key={item.id} className="media-video-item">
                                <iframe
                                  title={item.name}
                                  width="360"
                                  height="215"
                                  src={`https://www.youtube.com/embed/${item.key}`}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            );
                          })
                        ) : (
                          <p>No videos</p>
                        )}
                      </div>
                    </Tab>
                    <Tab eventKey="similar" title="Similar Movies">
                      <div className="container m-3 media-similar">
                        {singleMovie.videos ? (
                          singleMovie.similar.results.map((item) => {
                            return (
                              <div className="similar-img-div">
                                <Link to={`/movie/${item.id}`}>
                                  <img
                                    className="similar-img"
                                    src={`https://www.themoviedb.org/t/p/original${item.poster_path}`}
                                    alt={item.id}
                                  />
                                  <p>{item.title}</p>
                                </Link>
                              </div>
                            );
                          })
                        ) : (
                          <h3>No similar movies found</h3>
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              }
            </div>

            {singleMovie.recommendations && (
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
            )}
          </Col>

          <Col lg={4} sm={12} className="movie-page-right  mt-5 mb-2">
            <div className="movie-stats">
              <div id="status" className="movie-stats-item">
                <h1>Status</h1>
                <p>{singleMovie.status}</p>
              </div>
              <div id="language" className="movie-stats-item">
                <h1>Spoken languages</h1>
                {singleMovie.spoken_languages.map((item) => {
                  return <p>{item.english_name}</p>;
                })}
              </div>
              <div id="budget" className="movie-stats-item">
                <h1>Budget</h1>
                <p>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "USD",
                  }).format(singleMovie.budget) || null}
                </p>
              </div>
              <div id="revenue" className="movie-stats-item">
                <h1>Revenue</h1>
                <p>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "USD",
                  }).format(singleMovie.revenue) || null}
                </p>
              </div>
              <div id="production-company" className="movie-stats-item">
                <h1>Production companies</h1>

                {singleMovie.production_companies.map((item) => {
                  return <p>{item.name}</p>;
                })}
              </div>
              <div id="keywords" className="movie-stats-item">
                <h1>Keywords</h1>

                {singleMovie.production_companies.map((item) => {
                  return <p>{item.name}</p>;
                })}
              </div>

              {watchProviders ? (
                <div className="watchProviders">
                  {watchProviders.flatrate && (
                    <div className="watchProviders-watch">
                      <h3>Stream this movie </h3>
                      {watchProviders.flatrate.map((item) => {
                        return item ? (
                          <img
                            src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
                            alt={item.provider_name}
                            onClick={() => {
                              handleRedirect(item.provider_name);
                            }}
                          />
                        ) : (
                          <p>loading</p>
                        );
                      })}
                      {watchProviders.rent && (
                        <div className="watchProviders-watch">
                          <h3>Rent this movie </h3>
                          {watchProviders.rent.map((item) => {
                            return item ? (
                              <img
                                src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
                                alt={item.provider_name}
                                onClick={() => {
                                  handleRedirect(item.provider_name);
                                }}
                              />
                            ) : (
                              <h3>loading</h3>
                            );
                          })}
                          {watchProviders.buy && (
                            <div className="watchProviders-watch">
                              <h3>Buy this movie </h3>
                              {watchProviders.buy.map((item) => {
                                return item ? (
                                  <img
                                    src={`https://www.themoviedb.org/t/p/original${item.logo_path}`}
                                    alt={item.provider_name}
                                    onClick={() => {
                                      handleRedirect(item.provider_name);
                                    }}
                                  />
                                ) : (
                                  <h3>Loading</h3>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
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
