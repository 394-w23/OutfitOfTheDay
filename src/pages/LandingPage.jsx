import React, { useState, useEffect } from "react";
import getMockUser from "../utils/mockUser";
import getWeatherAPIURL from "../utils/userLocation";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BrowserRouter, useNavigate } from "react-router-dom";


const LandingPage = () => {
//   Weather: Sunny, Rainy, Cold, Warm
//   Temperature: Value

    const user = getMockUser();
    const [wind, setWind] = useState([]);
    const [temperature, setTemperature] = useState(30);
    const [weatherCode, setWeatherCode] = useState(1);
    const navigate = useNavigate();

    const weatherConditions = new Map([  [0, 'Clear sky'],
        [1, 'Mainly clear'],
        [2, 'Partly cloudy'],
        [3, 'Overcast'],
        [45, 'Fog'],
        [48, 'Depositing rime fog'],
        [51, 'Drizzle: Light intensity'],
        [53, 'Drizzle: Moderate intensity'],
        [55, 'Drizzle: Dense intensity'],
        [56, 'Freezing Drizzle: Light intensity'],
        [57, 'Freezing Drizzle: Dense intensity'],
        [61, 'Rain: Slight intensity'],
        [63, 'Rain: Moderate intensity'],
        [65, 'Rain: Heavy intensity'],
        [66, 'Freezing Rain: Light intensity'],
        [67, 'Freezing Rain: Heavy intensity'],
        [71, 'Snow fall: Slight intensity'],
        [73, 'Snow fall: Moderate intensity'],
        [75, 'Snow fall: Heavy intensity'],
        [77, 'Snow grains'],
        [80, 'Rain showers: Slight intensity'],
        [81, 'Rain showers: Moderate intensity'],
        [82, 'Rain showers: Violent intensity'],
        [85, 'Snow showers: Slight intensity'],
        [86, 'Snow showers: Heavy intensity'],
        [95, 'Thunderstorm: Slight or moderate'],
        [96, 'Thunderstorm with slight hail'],
        [99, 'Thunderstorm with heavy hail']
    ]);

    useEffect(() => {
        fetch(getWeatherAPIURL())
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setTemperature(data["current_weather"]["temperature"]);
            setWind(data["current_weather"]["windspeed"]);
            setWeatherCode(data["current_weather"]["weathercode"]);
          })
          .catch((err) => console.error(err));
      }, []);
    
    const checkWeather = () => {
        console.log(temperature);
        console.log(wind);
        console.log(weatherCode);
        console.log(weatherConditions.get(parseInt(weatherCode)));
    } 

  return (
    <Container className="weather-container">
        {checkWeather()}
        <Card.Text className="card-weather-greeting">
            Good Morning {user.displayName.split(" ")[0]}! <br/>
        </Card.Text>
        <Card className="card-container">
            <Card.Img
            variant="top"
            src={'https://img.icons8.com/ios-filled/512/downpour.png'}
            className={"card-image"}
            />
            <Card.Text className="card-weather-text">
                It's {temperature} and the weatherConditions are {weatherConditions.get(weatherCode)}.
            </Card.Text>
        </Card>
        <Card.Text>
                Next, Let's choose your outfit!
        </Card.Text>
        <Container className="home-button-container">
            <Button className="home-btn" onClick={() => navigate("/home")}>See my suggested outfits</Button>
        </Container>
    </Container>
  );
};

export default LandingPage;
