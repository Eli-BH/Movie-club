import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";

const CarouselComponent = ({ images }) => {
  return (
    <Container fluid>
      <Carousel indicators={false}>
        {images ? (
          images.map((item) => {
            return (
              <Carousel.Item key={item.title}>
                <Image
                  src={`https://www.themoviedb.org/t/p/original${item.poster_path}`}
                  alt={item.title}
                  style={{ maxHeight: 250 }}
                  rounded
                />
              </Carousel.Item>
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
      </Carousel>
    </Container>
  );
};

export default CarouselComponent;
