import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";

const ClothesCarousel = ({ data, allData, type, handleSelect, index }) => {
  const [isClicked, setIsClicked] = useState(false);
  if (JSON.stringify(data) === "{}" && !isClicked) {
    return (
      <Container className="carousel-not-found-container">
        <h6 className="carousel-not-found-title">
          No {type} available for this type of weather
        </h6>
        <Button
          onClick={() => setIsClicked(true)}
          className="carousel-not-found-button"
        >
          Click to see all {type}!
        </Button>
      </Container>
    );
  }

  return (
    <Container className="carousel-container">
      {JSON.stringify(data) === "{}" && isClicked ? (
        <Carousel
          interval={null}
          indicators={false}
          activeIndex={index}
          onSelect={handleSelect}
        >
          {Object.entries(allData).map(([idx, clothes]) => (
            <Carousel.Item key={idx}>
              <img src={clothes.url} alt="Slide" />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
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
      )}
    </Container>
  );
};

export default ClothesCarousel;
