import React, { useState } from "react";
import CarouselComponent from "./CarouselComponent";

import { AiOutlineSearch } from "react-icons/ai";
import Button from "react-bootstrap/esm/Button";
import { useHistory } from "react-router-dom";

const JumbotronComponent = ({ images, loading }) => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${query}`);
  };

  return (
    <div className=" jumbotronContainer">
      <div className="jumbotron jtc">
        <div className="jumbotron-carousel">
          <CarouselComponent images={images} />
        </div>

        <div>
          <div className="jumbotron-text">
            <h1>Welcome To Movie Club</h1>
            <p>
              If you know the name of the movie that you would like to see,
              search here.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="search-form">
            <input
              className="homepage-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
            />

            <Button type="submit" className="search-button" variant="blueBtn">
              <AiOutlineSearch className="mr-1 search" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JumbotronComponent;
