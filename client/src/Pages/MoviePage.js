import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { singleMovieSelector, fetchSingleMovie } from "../slices/singleMovie";

const MoviePage = ({ match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;
  const { loading, singleMovie } = useSelector(singleMovieSelector);

  useEffect(() => {
    dispatch(fetchSingleMovie(id));
  }, [dispatch, id]);

  console.log(singleMovie);
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
      <div className="container-xl">
        <div className="movie-page-left mt-5 mb-2">
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
        </div>

        <div className="movie-page-right">
          <div></div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MoviePage;
