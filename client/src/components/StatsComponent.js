import React from "react";

const StatsComponent = ({ singleMovie }) => {
  return (
    <div className="stats-border">
      <div className="stats-container">
        <div id="status" className="movie-stats-item">
          <h1 id="status">Status</h1>
          <p>{singleMovie.status}</p>
        </div>

        <div id="language" className="movie-stats-item">
          <h1 id="languages">Spoken languages</h1>
          {singleMovie.spoken_languages.map((item) => {
            return <p>{item.english_name}</p>;
          })}
        </div>

        <div id="budget" className="movie-stats-item">
          <h1 id="budget">Budget</h1>
          <p>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
            }).format(singleMovie.budget) || null}
          </p>
        </div>

        <div id="revenue" className="movie-stats-item">
          <h1 id="revenue">Revenue</h1>
          <p>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "USD",
            }).format(singleMovie.revenue) || null}
          </p>
        </div>

        <div id="production-company" className="movie-stats-item">
          <h1 id="production">Production companies</h1>
          {singleMovie.production_companies.map((item) => {
            return <p>{item.name}</p>;
          })}
        </div>

        <div id="keywords" className="movie-stats-item">
          <h1 id="keywords">Keywords</h1>

          {singleMovie.production_companies.map((item) => {
            return <p>{item.name}</p>;
          })}
        </div>
      </div>{" "}
    </div>
  );
};

export default StatsComponent;
