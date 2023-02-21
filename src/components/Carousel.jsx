import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";

const MyCarousel = ({ data, handleSelect, index }) => {
  return (
    <Container className="carousel-container">
      <Carousel
        interval={null}
        indicators={false}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {Object.entries(data).map(([idx, clothes]) => (
          <Carousel.Item key={idx}>
            <img src={clothes.url} alt="Slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default MyCarousel;
