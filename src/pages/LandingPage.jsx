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
// Feels like: 

    const user = getMockUser();
    const [wind, setWind] = useState([]);
    const [temperature, setTemperature] = useState(30);
    const [weatherCode, setWeatherCode] = useState(1);
    const navigate = useNavigate();

    const weatherConditions = new Map([  
        [0, 'Sunny'],
        [1, 'Clear'],

        [2, 'Cloudy'],
        [3, 'Cloudy'],

        [45, 'Foggy'],
        [48, 'Foggy'],

        [51, 'Rainy'],
        [53, 'Rainy'],
        [55, 'Rainy'],
        [56, 'Rainy'],
        [57, 'Rainy'],
        [61, 'Rainy'],
        [63, 'Rainy'],
        [65, 'Rainy'],
        [66, 'Rainy'],
        [67, 'Rainy'],

        [71, 'Snowy'],
        [73, 'Snowy'],
        [75, 'Snowy'],
        [77, 'Snowy'],

        [80, 'Rainy'],
        [81, 'Rainy'],
        [82, 'Rainy'],

        [85, 'Snowy'],
        [86, 'Snowy'],

        [95, 'Rainy'],
        [96, 'Rainy'],
        [99, 'Rainy']
    ]);

    const weatherIconUrl = new Map([  
        [0, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-512.png'],
        [1, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-512.png'],
        [2, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-22-128.png'],
        [3, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-22-128.png'],
        [45, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-22-128.png'],
        [48, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-22-128.png'],
        [51, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [53, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [55, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [56, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [57, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [61, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [63, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [65, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [66, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [67, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [71, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [73, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [75, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png'],
        [77, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png'],
        [80, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [81, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [82, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png'],
        [85, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png'],
        [86, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png'],
        [95, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png'],
        [96, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png'],
        [99, 'https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png']
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
            <Button className="home-btn" onClick={() => navigate("/home")}>See my suggested outfits</Button>
        </Container>
    </Container>
  );
};

export default LandingPage;
