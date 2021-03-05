import React from "react";
import Container from "react-bootstrap/Container";
import CarouselComponent from "../components/CarouselComponent";

export const HomePage = () => {
  return (
    <div className="homepage">
      <div className="carousel">
        <CarouselComponent />
      </div>
    </div>
  );
};

export default HomePage;
