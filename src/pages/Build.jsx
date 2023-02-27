import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ClothesCarousel from "../components/Carousel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDbData, useDbUpdate } from "../utils/firebase";
import getMockUser from "../utils/mockUser";
import getWeatherAPIURL from "../utils/userLocation";
import WeatherHeader from "../components/WeatherHeader";
import { weatherConditions, weatherIconUrl } from "../utils/weather";
import { useProfile } from "../utils/userProfile";

const Build = () => {
  const [weather, setWeather] = useState([]);
  const [wind, setWind] = useState([]);
  const [weatherCode, setWeatherCode] = useState();

  const user = getMockUser();
  const [closet] = useDbData("/closet");

  const [updateData] = useDbUpdate("/");

  const [isFavorite, setFavorite] = useState(false);
  const [favIdx, setFavIdx] = useState(false);

  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottoms, setSelectedBottoms] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);

  useEffect(() => {
    fetch(getWeatherAPIURL())
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data["current_weather"]["temperature"]);
        setWind(data["current_weather"]["windspeed"]);
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

  const filterClothesBasedOnWeather = (clothes) => {
    const weatherType = weatherConditions.get(weatherCode);
    console.log(weatherType);
    let filteredClothes = new Object();
    for (const key in clothes) {
      clothes[key].weather.forEach(function (item, index) {
        if (item === weatherType) {
          filteredClothes[key] = clothes[key];
        }
      });
    }
    return filteredClothes;
  };

  const currentHour = new Date().getHours();
  let timeOfDay = "Morning";
  if (12 <= currentHour && currentHour < 17) {
    timeOfDay = "Afternoon";
  } else if (17 <= currentHour) {
    timeOfDay = "Evening";
  }

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container className="home-container">
      <Container className="home-header-container">
        <span>
          Good {timeOfDay} {user.displayName.split(" ")[0]}!
        </span>{" "}
        <br />
        Let's choose your outfit. <br />
        Here's what we suggest!
      </Container>
      <div className="weather-header-container">
        <WeatherHeader
          weather={weather}
          weatherCode={weatherCode ? weatherCode : 0}
        />
      </div>
      <Container className="home-clothes-container">
        <Container className="home-clothes-top">
          <ClothesCarousel
            data={filterClothesBasedOnWeather(closet[user.uid].tops)}
            allData={closet[user.uid].tops}
            type="tops"
            handleSelect={handleSelectedTop}
            index={selectedTop}
          ></ClothesCarousel>
        </Container>
        <Container className="home-clothes-bottoms">
          <ClothesCarousel
            data={filterClothesBasedOnWeather(closet[user.uid].bottoms)}
            allData={closet[user.uid].bottoms}
            type="bottoms"
            handleSelect={handleSelectedBottoms}
            index={selectedBottoms}
          ></ClothesCarousel>
        </Container>
        <Container className="home-clothes-shoes">
          <ClothesCarousel
            data={filterClothesBasedOnWeather(closet[user.uid].shoes)}
            allData={closet[user.uid].shoes}
            type="shoes"
            handleSelect={handleSelectedShoes}
            index={selectedShoes}
          ></ClothesCarousel>
        </Container>
      </Container>
      <Container className="home-button-container">
        <Button className="home-btn">I'll wear this today!</Button>
        <Button
          className="home-btn-fav"
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
