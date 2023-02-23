import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { weatherIconUrl } from "../utils/weather";

const WeatherHeader = ({ weather, weatherCode }) => {
  console.log(weatherCode);
  return (
    <Container className="weather-header-container">
      <Container className="weather-1">
        <img src={weatherIconUrl.get(weatherCode)} alt="icon-weather" />
      </Container>
      <Container className="weather-2">{weather}°F</Container>
    </Container>
  );
};

export default WeatherHeader;
