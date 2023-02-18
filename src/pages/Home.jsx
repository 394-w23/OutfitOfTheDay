import React, { useState } from "react";
import MyCarousel from "../components/Carousel";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AiOutlineHeart } from "react-icons/ai";
import { useDbData, useDbUpdate } from "../utils/firebase";
import { useProfile } from "../utils/userProfile";
import { v4 as uuidv4 } from "uuid";
import getMockUser from "../utils/mockUser";
import axios from 'axios';

const Home = () => {

  // https://open-meteo.com/en/docs#latitude=42.04&longitude=-87.69&hourly=temperature_2m

  fetch("https://api.open-meteo.com/v1/forecast?latitude=42.04&longitude=-87.69&current_weather=true&temperature_unit=fahrenheit")
  .then(res => res.json())
  .then((out) => {
      console.log('Output: ', out["current_weather"]["temperature"]);
  }).catch(err => console.error(err));  
  
  const user = getMockUser();

  const [tops] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");
  const [shoes] = useDbData("/shoes");
  const [dresses] = useDbData("/dress");
  const [jackets] = useDbData("/jacket");
  const [updateData] = useDbUpdate("/");

  const [dress, setDress] = useState(false);
  const [jacket, setJacket] = useState(false);

  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottoms, setSelectedBottoms] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);

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

  const handleSelectedTop = (selectedIndex, e) => {
    setSelectedTop(selectedIndex);
  };

  const handleSelectedBottoms = (selectedIndex, e) => {
    setSelectedBottoms(selectedIndex);
  };

  const handleSelectedShoes = (selectedIndex, e) => {
    // console.log(shoes[selectedIndex]);
    if (selectedShoes != selectedIndex) {
      setSelectedShoes(selectedIndex);
    }
  };

  const saveSelectedFavourites = () => {
    // e.preventDefault();
    const uid = uuidv4();
    const favourites = {
      top: tops[selectedTop],
      bottom: bottoms[selectedBottoms],
      shoes: shoes[selectedShoes],
    };

    updateData({ ["/favourites/" + uid]: favourites });
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
        <Button className="home-btn-fav" onClick={saveSelectedFavourites}>
          <AiOutlineHeart size={20} /> Save this look
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
