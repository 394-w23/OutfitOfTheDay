import React from "react";
import Container from "react-bootstrap/Container";
import { weatherIconUrl } from "../utils/weather";

const WeatherHeader = ({ weather, weatherCode }) => {
  return (
    <Container className="weather-header-container">
      <Container className="weather-icon">
        <img src={weatherIconUrl.get(weatherCode)} alt="icon-weather" />
      </Container>
      <Container className="weather-temperature">{weather}°F</Container>
    </Container>
  );
};

export default WeatherHeader;
