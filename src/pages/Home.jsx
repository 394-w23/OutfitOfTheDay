import React, { useState, useEffect, useCallback  } from "react";
import MyCarousel from "../components/Carousel";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDbData, useDbUpdate } from "../utils/firebase";
import { useProfile } from "../utils/userProfile";
import { v4 as uuidv4 } from "uuid";
import getMockUser from "../utils/mockUser";
import axios from 'axios';

import {WiDaySunnyOvercast} from "weather-icons-react";

const Home = () => {
  const [weather, setWeather] = useState([]);
  const [wind, setWind] = useState([]);
  // https://open-meteo.com/en/docs#latitude=42.04&longitude=-87.69&hourly=temperature_2m

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=42.04&longitude=-87.69&current_weather=true&temperature_unit=fahrenheit"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data["current_weather"]["temperature"]);
        setWind(data["current_weather"]["windspeed"]);
      })
      .catch((err) => console.error(err));
  }, []);  
  
  const user = getMockUser();

  const [tops] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");
  const [shoes] = useDbData("/shoes");
  const [dresses] = useDbData("/dress");
  const [jackets] = useDbData("/jacket");
  const [favourites] = useDbData("/favourites");
  const [updateData] = useDbUpdate("/");

  const [dress, setDress] = useState(false);
  const [jacket, setJacket] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottoms, setSelectedBottoms] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);

  useEffect(() => {
    if(tops && bottoms && shoes) {
      handleFavorite()  
    }
  }, [tops, bottoms, shoes, favourites])

  useEffect(() => {
    handleFavorite()
  }, [selectedTop, selectedBottoms, selectedShoes])

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
    if (bottoms && tops && shoes) {
      const selectedOutfit = {
        bottom: bottoms[selectedBottoms+1],
        shoes: shoes[selectedShoes+1],
        top: tops[selectedTop+1],
      }
      let inFav = false
      if (favourites) {
        Object.values(favourites).map((existingFav, i) => {
          if (selectedOutfit.bottom === existingFav.bottom && selectedOutfit.shoes === existingFav.shoes && selectedOutfit.top === existingFav.top) {
            inFav = true
          }
        })
      }
      
      setFavorite(inFav)
    } else {
      // console.log("not loaded")
    }
    
  }

  const toggleFavorite = () => {
    if (isFavorite == false) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }
  
  const handleSelectedTop = (selectedIndex, e) => {
    setSelectedTop(selectedIndex);
  };

  const handleSelectedBottoms = (selectedIndex, e) => {
    setSelectedBottoms(selectedIndex);
  };

  const handleSelectedShoes = (selectedIndex, e) => {
    setSelectedShoes(selectedIndex);
  };

  const saveSelectedFavourites = () => {
    console.log("Saving Fav")
    if (isFavorite) {
      // TO DO: delete from favorite
      console.log("Already in Favorite")
    } else {
      const uid = uuidv4();
      const newFavourite = {
        top: tops[selectedTop+1],
        bottom: bottoms[selectedBottoms+1],
        shoes: shoes[selectedShoes+1],
      };
      updateData({ ["/favourites/" + uid]: newFavourite });
    }  
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;

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
        <span>Good Morning {user.displayName.split(" ")[0]}!</span> <br />
        Let's choose your outfit. <br />
        Here's what we suggest!
      </Container>
      <Container className="weather-header-container">
      <WiDaySunnyOvercast size={24} color='#000' />
        Today's temperature outside is {weather} degrees with a wind speed of {wind} mph.
      </Container>
      <Container className="home-clothes-container">
        <Container className="home-clothes-top">
          {tops && (
            <MyCarousel
              data={tops}
              handleSelect={handleSelectedTop}
              index={selectedTop}
            ></MyCarousel>
          )}
        </Container>
        <Container className="home-clothes-bottoms">
          {bottoms && (
            <MyCarousel
              data={bottoms}
              handleSelect={handleSelectedBottoms}
              index={selectedBottoms}
            ></MyCarousel>
          )}
        </Container>
        <Container className="home-clothes-shoes">
          {shoes && (
            <MyCarousel
              data={shoes}
              handleSelect={handleSelectedShoes}
              index={selectedShoes}
            ></MyCarousel>
          )}
        </Container>
      </Container>
      <Container className="home-button-container">
        <Button className="home-btn">I'll wear this today!</Button>
        <Button className="home-btn-fav" onClick={() => {saveSelectedFavourites();}}>
          {isFavorite ? ( <AiFillHeart size={20} /> ) : (<AiOutlineHeart size={20} />)} Save this look
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
