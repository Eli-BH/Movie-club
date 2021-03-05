import React from "react";
import CarouselComponent from "./CarouselComponent";
import Container from "react-bootstrap/Container";

const JumbotronComponent = ({ images }) => {
  return (
    <Container>
      <div className="jumbotron jtc">
        <div style={{ width: "auto" }}>
          <CarouselComponent images={images} />
        </div>
        <div className="pl-5">
          <h1>Welcome To Movie Club</h1>
          <p>
            Dave found joy in the daily routine of life. He awoke at the same
            time, ate the same breakfast and drove the same commute. He worked
            at a job that never seemed to change and he got home at 6 pm sharp
            every night. It was who he had been for the last ten years and he
            had no idea that was all about to change.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default JumbotronComponent;
