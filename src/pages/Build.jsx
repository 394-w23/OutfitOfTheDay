import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoSettings } from "react-icons/go";
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
import { weatherConditions } from "../utils/weather";
import getTodaysDate from "../utils/todayDate.js";
import { useProfile } from "../utils/userProfile";
import FilterModal from "../components/FilterModal";

const Build = () => {
  const navigate = useNavigate();
  const user = getMockUser();
  const [closet] = useDbData("/closet");
  const [updateData] = useDbUpdate("/");

  const [weather, setWeather] = useState([]);
  const [weatherCode, setWeatherCode] = useState();
  const [formality, setFormality] = useState(null);
  const [isFavorite, setFavorite] = useState(false);
  const [favIdx, setFavIdx] = useState(false);

  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottoms, setSelectedBottoms] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);

  const [filteredTops, setFilteredTops] = useState(null);
  const [filteredBottoms, setFilteredBottoms] = useState(null);
  const [filteredShoes, setFilteredShoes] = useState(null);

  const [show, setShow] = useState(true);

  useEffect(() => {
    fetch(getWeatherAPIURL())
      .then((res) => res.json())
      .then((data) => {
        setWeather(data["current_weather"]["temperature"]);
        setWeatherCode(data["current_weather"]["weathercode"]);
        handleInitialData();
      })
      .catch((err) => console.error(err));
  }, [formality]);

  useEffect(() => {
    if (closet) {
      handleFavorite();
    }
  }, [closet, formality]);

  useEffect(() => {
    handleFavorite();
  }, [selectedTop, selectedBottoms, selectedShoes]);

  useEffect(() => {
    handleFavorite();
  }, [filteredTops, filteredBottoms, filteredShoes]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInitialData = () => {
    if (!formality) setFormality("formal");
    if (closet) {
      const tops = closet[user.uid].tops;
      const bottoms = closet[user.uid].bottoms;
      const shoes = closet[user.uid].shoes;
      setFilteredTops(filterClothesBasedOnWeather(tops, formality));
      setFilteredBottoms(filterClothesBasedOnWeather(bottoms, formality));
      setFilteredShoes(filterClothesBasedOnWeather(shoes, formality));
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

  const handleFavorite = () => {
    if (verifyAllFilters()) {
      const selectedOutfit = {
        tops: Object.values(filteredTops)[selectedTop],
        bottoms: Object.values(filteredBottoms)[selectedBottoms],
        shoes: Object.values(filteredShoes)[selectedShoes],
      };

      let inFav = false;
      Object.entries(closet[user.uid].outfits).map(([idx, outfit]) => {
        if (
          selectedOutfit.bottoms.url === outfit.bottoms.url &&
          selectedOutfit.shoes.url === outfit.shoes.url &&
          selectedOutfit.tops.url === outfit.tops.url
        ) {
          if (outfit.isFavorite) {
            inFav = true;
            setFavIdx(idx);
          }
        }
      });
      setFavorite(inFav);
    }
  };

  const saveSelectedFavourites = () => {
    if (isFavorite) {
      const outfit = closet[user.uid].outfits[favIdx];
      updateData({
        ["/closet/" + user.uid + "/outfits/" + favIdx]: {
          ...outfit,
          isFavorite: false,
        },
      });
      setFavorite(false);
    } else {
      saveSelectedOutfit(true, false);
    }
  };

  const saveSelectedOutfit = (isFavorite = false, redirect = true) => {
    if (closet) {
      let isFound = false;
      const selectedOutfit = {
        tops: Object.values(filteredTops)[selectedTop],
        bottoms: Object.values(filteredBottoms)[selectedBottoms],
        shoes: Object.values(filteredShoes)[selectedShoes],
      };
      if (closet[user.uid].outfits) {
        Object.entries(closet[user.uid].outfits).map(([idx, outfit]) => {
          if (
            selectedOutfit.bottoms.url === outfit.bottoms.url &&
            selectedOutfit.shoes.url === outfit.shoes.url &&
            selectedOutfit.tops.url === outfit.tops.url
          ) {
            isFound = true;
            updateData({
              ["/closet/" + user.uid + "/outfits/" + idx]: {
                ...outfit,
                times: redirect ? outfit.times + 1 : outfit.times,
                isFavorite: isFavorite,
              },
            });
            updateData({
              ["/closet/" + user.uid + "/todays/" + idx]: {
                ...outfit,
                times: redirect ? outfit.times + 1 : outfit.times,
                isFavorite: isFavorite,
              },
            });
            updateData({
              ["/closet/" + user.uid + "/lastWorn"]: getTodaysDate(),
            });
          }
        });
      }

      if (!isFound) {
        const uid = uuidv4();
        selectedOutfit.times = 1;
        selectedOutfit.isFavorite = isFavorite;
        selectedOutfit.weather = weatherConditions.get(weatherCode);
        updateData({
          ["/closet/" + user.uid + "/outfits/" + uid]: selectedOutfit,
        });
        updateData({
          ["/closet/" + user.uid + "/todays/" + uid]: selectedOutfit,
        });
        updateData({
          ["/closet/" + user.uid + "/lastWorn"]: getTodaysDate(),
        });
      }

      if (redirect) navigate("/");
    }
  };

  const filterClothesBasedOnWeather = (clothes, formality) => {
    const weatherType = weatherConditions.get(weatherCode);
    let filteredClothes = new Object();
    for (const key in clothes) {
      clothes[key].weather.forEach(function (item, index) {
        if (item === weatherType && clothes[key].formality === formality) {
          filteredClothes[key] = clothes[key];
        }
      });
    }
    return filteredClothes;
  };

  const setShowAll = (type) => {
    if (type === "tops") setFilteredTops(closet[user.uid].tops);
    if (type === "bottoms") setFilteredBottoms(closet[user.uid].bottoms);
    if (type === "shoes") setFilteredShoes(closet[user.uid].shoes);
  };

  const verifyAllFilters = () => {
    if (!filteredTops || JSON.stringify(filteredTops) === "{}") return false;
    if (!filteredBottoms || JSON.stringify(filteredBottoms) === "{}")
      return false;
    if (!filteredShoes || JSON.stringify(filteredShoes) === "{}") return false;
    return true;
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;
  if (!filteredTops)
    return <h5 className="text-muted">Loading user closet...</h5>;
  if (!filteredBottoms)
    return <h5 className="text-muted">Loading user closet...</h5>;
  if (!filteredShoes)
    return <h5 className="text-muted">Loading user closet...</h5>;

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
              onChange={(e) => setFormality(e.currentTarget.value)}
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
              onChange={(e) => setFormality(e.currentTarget.value)}
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
            data={filteredTops}
            type="tops"
            handleSelect={handleSelectedTop}
            setShowAll={setShowAll}
            index={selectedTop}
          ></ClothesCarousel>
        </Container>
        <Container className="build-clothes-bottoms">
          <ClothesCarousel
            data={filteredBottoms}
            type="bottoms"
            handleSelect={handleSelectedBottoms}
            setShowAll={setShowAll}
            index={selectedBottoms}
          ></ClothesCarousel>
        </Container>
        <Container className="build-clothes-shoes">
          <ClothesCarousel
            data={filteredShoes}
            type="shoes"
            handleSelect={handleSelectedShoes}
            setShowAll={setShowAll}
            index={selectedShoes}
          ></ClothesCarousel>
        </Container>
      </Container>
      {verifyAllFilters() === true && (
        <Container className="build-button-container">
          <Button className="build-btn" onClick={() => saveSelectedOutfit()}>
            I'll wear this today!
          </Button>
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
      )}
      <FilterModal
        show={show}
        handleClose={handleClose}
        formality={formality}
      />
    </Container>
  );
};

export default Build;
