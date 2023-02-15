import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";

const MyCarousel = ({ data, bottoms }) => {
  return (
    <Container className="carousel-container">
      <Carousel interval={null} indicators={false}>
        {data.map((imageLink, idx) => (
          <Carousel.Item key={idx}>
            <img src={imageLink} alt="Slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default MyCarousel;
