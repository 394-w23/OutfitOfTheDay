import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import MyCarousel from "../components/Carousel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDbData, useDbUpdate } from "../utils/firebase";
import { useProfile } from "../utils/userProfile";
import getMockUser from "../utils/mockUser";
import getWeatherAPIURL from "../utils/userLocation";
import WeatherHeader from "../components/weatherheader";

import { WiDaySunnyOvercast } from "weather-icons-react";

const Home = () => {
  const [weather, setWeather] = useState([]);
  const [wind, setWind] = useState([]);
  const [weatherCode, setWeatherCode] = useState(0);
  // https://open-meteo.com/en/docs#latitude=42.04&longitude=-87.69&hourly=temperature_2m

  useEffect(() => {
    fetch(getWeatherAPIURL())
      .then((res) => res.json())
      .then((data) => {
        setWeather(data["current_weather"]["temperature"]);
        setWind(data["current_weather"]["windspeed"]);
        setWeatherCode(data["current_weather"]["weatherCode"]);
      })
      .catch((err) => console.error(err));
  }, []);

  const user = getMockUser();
  const [closet] = useDbData("/closet");

  const [updateData] = useDbUpdate("/");

  const [dress, setDress] = useState(false);
  const [jacket, setJacket] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottoms, setSelectedBottoms] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);

  useEffect(() => {
    if (closet) {
      handleFavorite();
    }
  }, [closet]);

  useEffect(() => {
    handleFavorite();
  }, [selectedTop, selectedBottoms, selectedShoes]);

  const handleDress = () => {
    if (dress == false) {
      setDress(true);
    } else {
      setDress(false);
    }
  };

  const handleJacket = () => {
    if (jacket == false) {
      setJacket(true);
    } else {
      setJacket(false);
    }
  };

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
          inFav = true;
        }
      });
      setFavorite(inFav);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite == false) {
      setFavorite(true);
    } else {
      setFavorite(false);
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
    if (isFavorite) return;
    const uid = uuidv4();
    const favorites = {
      tops: Object.values(closet[user.uid].tops)[selectedTop],
      bottoms: Object.values(closet[user.uid].bottoms)[selectedBottoms],
      shoes: Object.values(closet[user.uid].shoes)[selectedShoes],
    };
    updateData({ ["/closet/" + user.uid + "/favorites/" + uid]: favorites });
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  var currentHour = new Date().getHours();
  var timeOfDay = "Morning";
  if (12 <= currentHour && currentHour < 17) {
    timeOfDay = "Afternoon";
  } else if (17 <= currentHour) {
    timeOfDay = "Evening";
  }

  return (
    <Container>
      {/*       {
        <Form.Check
          inline="true"
          label="Dress?"
          type="switch"
          onClick={() => handleDress()}
        />
      } */}
      {/* <Form.Check
        inline="true"
        label="Jacket?"
        type="switch"
        onClick={() => handleJacket()}
    /> */}
      <Container className="home-header-container">
        <span>
          Good {timeOfDay} {user.displayName.split(" ")[0]}!
        </span>{" "}
        <br />
        Let's choose your outfit. <br />
        Here's what we suggest!
      </Container>
      <div className="weather-header-container">
        <WeatherHeader weather={weather} />
      </div>
      <Container className="home-clothes-container">
        <Container className="home-clothes-top">
          <MyCarousel
            data={closet[user.uid].tops}
            handleSelect={handleSelectedTop}
            index={selectedTop}
          ></MyCarousel>
        </Container>
        <Container className="home-clothes-bottoms">
          <MyCarousel
            data={closet[user.uid].bottoms}
            handleSelect={handleSelectedBottoms}
            index={selectedBottoms}
          ></MyCarousel>
        </Container>
        <Container className="home-clothes-shoes">
          <MyCarousel
            data={closet[user.uid].shoes}
            handleSelect={handleSelectedShoes}
            index={selectedShoes}
          ></MyCarousel>
        </Container>
      </Container>
      <Container className="home-button-container">
        <Button className="home-btn">I'll wear this today!</Button>
        <Button
          className="home-btn-fav"
          onClick={() => {
            saveSelectedFavourites();
          }}
        >
          {isFavorite ? (
            <>
              <AiFillHeart size={20} />
              {"Saved"}
            </>
          ) : (
            <>
              <AiOutlineHeart size={20} />
              {"Save this look"}
            </>
          )}{" "}
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
