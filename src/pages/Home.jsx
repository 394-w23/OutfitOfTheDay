import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsShuffle } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDbData } from "../utils/firebase";
import getMockUser from "../utils/mockUser";
import getWeatherAPIURL from "../utils/userLocation";
import WeatherHeader from "../components/WeatherHeader";
import getDayOfWeek from "../utils/dayOfWeek";
import OutfitCard from "../components/OutfitCard";

const Home = () => {
  const navigate = useNavigate();
  const user = getMockUser();
  const [closet] = useDbData("/closet");

  const [weather, setWeather] = useState([]);
  const [weatherCode, setWeatherCode] = useState();

  useEffect(() => {
    fetch(getWeatherAPIURL())
      .then((res) => res.json())
      .then((data) => {
        setWeather(data["current_weather"]["temperature"]);
        setWeatherCode(data["current_weather"]["weathercode"]);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container>
      <Container className="home-header-container">
        <Container className="home-header-title">
          Happy {getDayOfWeek()} {user.displayName.split(" ")[0]}!
        </Container>
        <Container className="home-header-weather">
          <WeatherHeader
            weather={weather}
            weatherCode={weatherCode ? weatherCode : 0}
          />
        </Container>
      </Container>
      <Container className="home-button-container">
        <Container
          className="home-build-button"
          onClick={() => navigate("/build")}
        >
          <AiOutlinePlus size={24} />
          <p>
            Build a new <br /> Outfit
          </p>
        </Container>
        <Container
          className="home-suggest-button"
          onClick={() =>
            navigate("/suggest", {
              state: {
                closet: closet,
                weather: weather,
                weatherCode: weatherCode,
              },
            })
          }
        >
          <BsShuffle size={24} />
          <p>
            Give me a <br /> suggestion
          </p>
        </Container>
      </Container>
      <Container className="home-favorites-container">
        <Container className="home-favorites-title">
          <h6>Quick Select: Favorites</h6>
        </Container>
        <Container className="home-favorites-panel">
          <Row xs={2} md={2}>
            {Object.entries(closet[user.uid].outfits)
              .filter(([idx, outfit]) => outfit.isFavorite === true)
              .sort((a, b) => b[1].times - a[1].times)
              .slice(0, 2)
              .map(([idx, clothes]) => (
                <Col key={idx}>
                  <OutfitCard clothes={clothes} idx={idx} modalShown={true} />
                </Col>
              ))}
          </Row>
        </Container>
        <Container className="home-favorites-footer">
          <h6
            onClick={() =>
              navigate("/outfits", { state: { showFavorites: true } })
            }
          >
            View All Favorites
          </h6>
        </Container>
      </Container>
      {closet[user.uid].todays && (
        <Container className="home-favorites-container">
          <Container className="home-favorites-title">
            {Object.entries(closet[user.uid].todays).length <= 1 ? (
              <h6>Today's Outfit</h6>
            ) : (
              <h6>Today's Outfits</h6>
            )}
          </Container>
          <Container className="home-favorites-panel">
            <Row xs={2} md={2}>
              {Object.entries(closet[user.uid].todays).map(([idx, clothes]) => (
                <Col key={idx}>
                  <OutfitCard clothes={clothes} idx={null} modalShown={false} />
                </Col>
              ))}
            </Row>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default Home;
