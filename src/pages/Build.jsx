import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import ClothesCarousel from "../components/Carousel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useDbData, useDbUpdate } from "../utils/firebase";
import getMockUser from "../utils/mockUser";
import getWeatherAPIURL from "../utils/userLocation";
import WeatherHeader from "../components/WeatherHeader";
import { weatherConditions, weatherIconUrl } from "../utils/weather";
import { useProfile } from "../utils/userProfile";

const Build = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState([]);
  const [weatherCode, setWeatherCode] = useState();

  const user = getMockUser();
  const [closet] = useDbData("/closet");

  const [updateData] = useDbUpdate("/");

  const [isFavorite, setFavorite] = useState(false);
  const [favIdx, setFavIdx] = useState(false);

  const [formality, setFormality] = useState("formal");

  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottoms, setSelectedBottoms] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);

  useEffect(() => {
    fetch(getWeatherAPIURL())
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setWeather(data["current_weather"]["temperature"]);
        setWeatherCode(data["current_weather"]["weathercode"]);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (closet) {
      handleFavorite();
    }
  }, [closet]);

  useEffect(() => {
    handleFavorite();
  }, [selectedTop, selectedBottoms, selectedShoes]);

  const handleFavorite = () => {
    if (closet) {
      const selectedOutfit = {
        tops: Object.values(closet[user.uid].tops)[selectedTop],
        bottoms: Object.values(closet[user.uid].bottoms)[selectedBottoms],
        shoes: Object.values(closet[user.uid].shoes)[selectedShoes],
      };

      let inFav = false;
      Object.entries(closet[user.uid].favorites).map(([idx, favorite]) => {
        if (
          selectedOutfit.bottoms.url === favorite.bottoms.url &&
          selectedOutfit.shoes.url === favorite.shoes.url &&
          selectedOutfit.tops.url === favorite.tops.url
        ) {
          setFavIdx(idx);
          inFav = true;
        }
      });
      setFavorite(inFav);
    }
  };

  const handleFormality = (e) => {
    setFormality(e);
    console.log(e);
  };

  const handleSelectedTop = (selectedIndex) => {
    setSelectedTop(selectedIndex);
  };

  const handleSelectedBottoms = (selectedIndex) => {
    setSelectedBottoms(selectedIndex);
  };

  const handleSelectedShoes = (selectedIndex) => {
    setSelectedShoes(selectedIndex);
  };

  const saveSelectedFavourites = () => {
    if (isFavorite) {
      updateData({ ["/closet/" + user.uid + "/favorites/" + favIdx]: null });
      setFavorite(false);
    } else {
      const uid = uuidv4();
      const favorites = {
        tops: Object.values(closet[user.uid].tops)[selectedTop],
        bottoms: Object.values(closet[user.uid].bottoms)[selectedBottoms],
        shoes: Object.values(closet[user.uid].shoes)[selectedShoes],
        times: 0,
      };
      updateData({ ["/closet/" + user.uid + "/favorites/" + uid]: favorites });
    }
  };

  const filterClothesBasedOnWeather = (clothes, formality) => {
    const weatherType = weatherConditions.get(weatherCode);
    let filteredClothes = new Object();
    for (const key in clothes) {
      clothes[key].weather.forEach(function (item, index) {
        if (item === weatherType && clothes[key].formality == formality) {
          filteredClothes[key] = clothes[key];
        }
      });
    }
    return filteredClothes;
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container className="build-container">
      <Container className="build-back-arrow">
        <IoMdArrowBack size={20} onClick={() => navigate("/")} />
      </Container>
      <Container className="build-header-container">
        <Container className="build-header-toggle">
          <ButtonGroup className="formality-toggle">
            <ToggleButton
              id="radio-formal"
              size="sm"
              type="radio"
              name="radio"
              value="formal"
              variant={formality === "formal" ? "dark" : "light"}
              checked={formality === "formal"}
              onChange={(e) => handleFormality(e.currentTarget.value)}
            >
              Formal
            </ToggleButton>
            <ToggleButton
              id="radio-casual"
              size="sm"
              type="radio"
              name="radio"
              value="casual"
              variant={formality === "casual" ? "dark" : "light"}
              checked={formality === "casual"}
              onChange={(e) => handleFormality(e.currentTarget.value)}
            >
              Casual
            </ToggleButton>
          </ButtonGroup>
        </Container>
        <Container className="build-header-weather">
          <WeatherHeader
            weather={weather}
            weatherCode={weatherCode ? weatherCode : 0}
          />
        </Container>
      </Container>
      <Container className="build-clothes-container">
        <Container className="build-clothes-top">
          <ClothesCarousel
            data={filterClothesBasedOnWeather(closet[user.uid].tops, formality)}
            allData={closet[user.uid].tops}
            type="tops"
            handleSelect={handleSelectedTop}
            index={selectedTop}
          ></ClothesCarousel>
        </Container>
        <Container className="build-clothes-bottoms">
          <ClothesCarousel
            data={filterClothesBasedOnWeather(
              closet[user.uid].bottoms,
              formality
            )}
            allData={closet[user.uid].bottoms}
            type="bottoms"
            handleSelect={handleSelectedBottoms}
            index={selectedBottoms}
          ></ClothesCarousel>
        </Container>
        <Container className="build-clothes-shoes">
          <ClothesCarousel
            data={filterClothesBasedOnWeather(
              closet[user.uid].shoes,
              formality
            )}
            allData={closet[user.uid].shoes}
            type="shoes"
            handleSelect={handleSelectedShoes}
            index={selectedShoes}
          ></ClothesCarousel>
        </Container>
      </Container>
      <Container className="build-button-container">
        <Button className="build-btn">I'll wear this today!</Button>
        <Button
          className="build-btn-fav"
          variant="light"
          onClick={() => {
            saveSelectedFavourites();
          }}
        >
          {isFavorite ? (
            <>
              <AiFillHeart size={20} />
              {"  Favorited"}
            </>
          ) : (
            <>
              <AiOutlineHeart size={20} />
              {"  Favorite this look"}
            </>
          )}{" "}
        </Button>
      </Container>
    </Container>
  );
};

export default Build;
