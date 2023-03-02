import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";

const ClothesCarousel = ({ data, type, handleSelect, index, setShowAll }) => {
  if (JSON.stringify(data) === "{}") {
    return (
      <Container className="carousel-not-found-container">
        <h6 className="carousel-not-found-title">
          No {type} available for this type of weather/formality
        </h6>
        <p onClick={() => setShowAll(type)} className="carousel-not-found-link">
          Click to see all {type}!
        </p>
      </Container>
    );
  }

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

export default ClothesCarousel;
