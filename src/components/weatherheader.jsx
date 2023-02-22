import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { Container } from "react-bootstrap";

function WeatherHeader(props) {
  let weather = props.weather;
  let iconProps = {};


  const defaults = {
    icon: 'CLEAR_DAY',
    color: 'goldenrod',
    size: 512,
    animate: true
  };
  if (weather >= 80) {
    iconProps = { icon: "CLEAR_DAY", color: "yellow", size: 12, animate: true };
  } else if (weather >= 60) {
    iconProps = { icon: "PARTLY_CLOUDY_DAY", color: "grey", size: 12, animate: true };
  } else if (weather >= 40) {
    iconProps = { icon: "CLOUDY", color: "grey", size: 12, animate: true };
  } else if (weather >= 20) {
    iconProps = { icon: "RAIN", color: "blue", size: 12, animate: true };
  } else {
    iconProps = { icon: "SNOW", color: "white", size: 10, animate: true };
  }

  return (
    <Container className="weather-header-container">
      <ReactAnimatedWeather
        icon={iconProps.icon}
        color={iconProps.color}
        size={props.size}
        animate={props.animate}
      />
      <div style={{ fontFamily: "Arial", fontSize: "18px" }}>
        {weather}°
      </div>
    </Container>
  );
}

export default WeatherHeader;