import React, { useState, useEffect } from "react";
import getMockUser from "../utils/mockUser";
import getWeatherAPIURL from "../utils/userLocation";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { weatherConditions, weatherIconUrl } from "../utils/weather";

const Landing = ({ setStep }) => {
  //   Weather: Sunny, Rainy, Cold, Warm
  //   Temperature: Value
  // Feels like:

  const user = getMockUser();
  const [wind, setWind] = useState([]);
  const [temperature, setTemperature] = useState(30);
  const [weatherCode, setWeatherCode] = useState(1);

  useEffect(() => {
    fetch(getWeatherAPIURL())
      .then((res) => res.json())
      .then((data) => {
        setTemperature(data["current_weather"]["temperature"]);
        setWind(data["current_weather"]["windspeed"]);
        setWeatherCode(data["current_weather"]["weathercode"]);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;

  var currentHour = new Date().getHours();
  var timeOfDay = "Morning";
  if (12 <= currentHour && currentHour < 17) {
    timeOfDay = "Afternoon";
  } else if (17 <= currentHour) {
    timeOfDay = "Evening";
  }

  return (
    <Container className="weather-container">
      <Card.Text className="card-weather-greeting">
        Good {timeOfDay} {user.displayName.split(" ")[0]}! <br />
      </Card.Text>
      <Card className="card-container">
        <Card.Img
          variant="top"
          src={weatherIconUrl.get(weatherCode)}
          className={"card-image"}
        />
        <Card.Text className="card-weather-text">
        {temperature}F and it's {weatherConditions.get(weatherCode)} outside.
        </Card.Text>
      </Card>
      <Card.Text className="card-outfit-text">
        Next, Let's choose your outfit!
      </Card.Text>
      <Container className="home-button-container">
        <Button className="home-btn" onClick={() => setStep(1)}>
          See my suggested outfits
        </Button>
      </Container>
    </Container>
  );
};

export default Landing;
