import Carousel from "react-bootstrap/Carousel";
import React, { useState } from 'react';

const MyCarousel = ({ data }) => {
  return (
    <div className="carousel">
      <Carousel interval={null} activeIndex={index} indicators={false} onSelect={handleSelect}>
        {data.map((imageLink, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="w-100 shadow-1-strong rounded mb-4"
              src={imageLink}
              alt="Slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
