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
        <div style={{ display: "flex" }}>
          <div>
            <img
              src={`https://www.themoviedb.org/t/p/original${singleMovie.poster_path}`}
              height="350"
              alt={singleMovie.title}
            />
          </div>

          <div>
            <div>
              <h1>{singleMovie.title}</h1>
            </div>
            <div>
              <ul style={{ display: "inline" }}>
                <li>{singleMovie.release_date}</li>
                {singleMovie.genres ? (
                  singleMovie.genres.map((item, index) => {
                    return <li key={index}>{item.name}, </li>;
                  })
                ) : (
                  <li></li>
                )}
                <li>{singleMovie.runtime} minutes</li>
              </ul>
            </div>

            <div>
              <p>
                <i>{singleMovie.tagline}</i>
              </p>
              <h3>Overview</h3>
              <p>{singleMovie.overview}</p>
            </div>

            <div>
              <div>
                <h6>{singleMovie.credits.cast[0].name}</h6>
                <p>{singleMovie.credits.cast[0].known_for_department}</p>
              </div>
              <div>
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
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MoviePage;
