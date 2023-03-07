import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoMdArrowBack } from "react-icons/io";
import { useDbData } from "../utils/firebase";
import WeatherHeader from "../components/WeatherHeader";
import OutfitCard from "../components/OutfitCard";
import getMockUser from "../utils/mockUser";
import getWeatherAPIURL from "../utils/userLocation";
import { weatherConditions } from "../utils/weather";

const Suggest = () => {
  const navigate = useNavigate();
  const user = getMockUser();

  const { state } = useLocation();
  const { closet, weather, weatherCode } = state;

  const [filteredFormalTops, setFilteredFormalTops] = useState(null);
  const [filteredFormalBottoms, setFilteredFormalBottoms] = useState(null);
  const [filteredFormalShoes, setFilteredFormalShoes] = useState(null);
  const [filteredCasualTops, setFilteredCasualTops] = useState(null);
  const [filteredCasualBottoms, setFilteredCasualBottoms] = useState(null);
  const [filteredCasualShoes, setFilteredCasualShoes] = useState(null);

  useEffect(() => {
    handleInitialData();
  }, []);

  const handleInitialData = () => {
    const tops = closet[user.uid].tops;
    const bottoms = closet[user.uid].bottoms;
    const shoes = closet[user.uid].shoes;
    setFilteredCasualTops(filterClothesBasedOnWeather(tops, "casual"));
    setFilteredCasualBottoms(filterClothesBasedOnWeather(bottoms, "casual"));
    setFilteredCasualShoes(filterClothesBasedOnWeather(shoes, "casual"));
    setFilteredFormalTops(filterClothesBasedOnWeather(tops, "formal"));
    setFilteredFormalBottoms(filterClothesBasedOnWeather(bottoms, "formal"));
    setFilteredFormalShoes(filterClothesBasedOnWeather(shoes, "formal"));
  };

  const filterClothesBasedOnWeather = (clothes, formality) => {
    const weatherType = weatherConditions.get(weatherCode);

    let filteredClothes = new Object();
    for (const key in clothes) {
      clothes[key].weather.forEach(function (item, index) {
        if (weatherType === item && clothes[key].formality === formality) {
          filteredClothes[key] = clothes[key];
        }
      });
    }
    return filteredClothes;
  };

  const generateCasualOutfit = () => {
    let casualOutfits = new Object();
    const topsSize = Object.values(filteredCasualTops).length;
    const bottomsSize = Object.values(filteredCasualBottoms).length;
    const shoesSize = Object.values(filteredCasualShoes).length;

    if (topsSize === 0 || bottomsSize === 0 || shoesSize === 0) return {};

    for (let i = 0; i < 2; i++) {
      const id = uuidv4();
      const randomTop = Math.floor(Math.random() * topsSize);
      const randomBottom = Math.floor(Math.random() * bottomsSize);
      const randomShoes = Math.floor(Math.random() * shoesSize);

      const selectedOutfit = {
        tops: Object.values(filteredCasualTops)[randomTop],
        bottoms: Object.values(filteredCasualBottoms)[randomBottom],
        shoes: Object.values(filteredCasualShoes)[randomShoes],
        times: 0,
        isFavorite: false,
      };

      casualOutfits[id] = selectedOutfit;
    }

    return casualOutfits;
  };

  const generateFormalOutfit = () => {
    let formalOutfits = new Object();
    const topsSize = Object.values(filteredFormalTops).length;
    const bottomsSize = Object.values(filteredFormalBottoms).length;
    const shoesSize = Object.values(filteredFormalShoes).length;

    if (topsSize === 0 || bottomsSize === 0 || shoesSize === 0) return {};

    for (let i = 0; i < 2; i++) {
      const id = uuidv4();
      const randomTop = Math.floor(Math.random() * topsSize);
      const randomBottom = Math.floor(Math.random() * bottomsSize);
      const randomShoes = Math.floor(Math.random() * shoesSize);

      const selectedOutfit = {
        tops: Object.values(filteredFormalTops)[randomTop],
        bottoms: Object.values(filteredFormalBottoms)[randomBottom],
        shoes: Object.values(filteredFormalShoes)[randomShoes],
        times: 0,
        isFavorite: false,
      };

      formalOutfits[id] = selectedOutfit;
    }

    return formalOutfits;
  };

  const verifyInitClothes = () => {
    if (
      filteredCasualTops &&
      filteredCasualBottoms &&
      filteredCasualShoes &&
      filteredFormalTops &&
      filteredFormalBottoms &&
      filteredFormalShoes
    )
      return true;
    return false;
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;
  if (!verifyInitClothes())
    return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container className="suggest-container">
      <Container className="build-back-arrow">
        <IoMdArrowBack size={20} onClick={() => navigate("/")} />
      </Container>
      <Container className="home-header-container">
        <Container className="home-header-title">
          Suggested by Category
        </Container>
        <Container className="home-header-weather">
          <WeatherHeader
            weather={weather}
            weatherCode={weatherCode ? weatherCode : 0}
          />
        </Container>
      </Container>
      <Container className="suggest-casual-container">
        <Container>
          <h6>Casual</h6>
        </Container>
        <Container>
          <Row xs={2} md={2}>
            {Object.entries(generateCasualOutfit()).map(([idx, clothes]) => (
              <Col key={idx}>
                <OutfitCard clothes={clothes} idx={idx} modalShown={true} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
      <Container className="suggest-formal-container">
        <Container>
          <h6>Formal</h6>
        </Container>
        <Container>
          <Row xs={2} md={2}>
            {Object.entries(generateFormalOutfit()).map(([idx, clothes]) => (
              <Col key={idx}>
                <OutfitCard clothes={clothes} idx={idx} modalShown={true} />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default Suggest;
