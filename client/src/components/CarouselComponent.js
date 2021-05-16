import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselComponent = ({ images }) => {
  return (
    <div className="carousel-container">
      <Carousel className="carousel-object" indicators={false}>
        {images ? (
          images.map((item) => {
            return (
              <Carousel.Item key={item.title}>
                <img
                  src={`https://www.themoviedb.org/t/p/original${item.backdrop_path}`}
                  alt={item.title}
                  //width 250
                  className="carousel-image"
                />
              </Carousel.Item>
            );
          })
        ) : (
          <h1>Loading </h1>
        )}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
