import React, { useState } from "react";
import CarouselComponent from "./CarouselComponent";
import Container from "react-bootstrap/Container";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "react-bootstrap/esm/Button";

const JumbotronComponent = ({ images }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("searched");
  };

  return (
    <div className="container-sm" style={{ padding: 0 }}>
      <div className="jumbotron jtc">
        <div style={{ width: 200 }} className="jumbotron-carousel">
          <CarouselComponent images={images} />
        </div>

        <div>
          <h1>Welcome To Movie Club</h1>
          <p>
            If you know the name of the movie that you would like to see, search
            here.
          </p>
          <form onSubmit={handleSubmit} className="search-form">
            <input
              className="homepage-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />

            <Button type="submit" className="search-button">
              Search
              <AiOutlineSearch />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JumbotronComponent;
