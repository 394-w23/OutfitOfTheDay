import React, { useState } from "react";
import MyCarousel from "../components/Carousel";
import { useDbData } from "../utils/firebase";
import Form from "react-bootstrap/Form";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Button } from "bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [tops] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");
  const [shoes] = useDbData("/shoes");

  const [dress, setDress] = useState(false);
  const [jacket, setJacket] = useState(false);

  const [selectedTop, setSelectedTop] = useState(0);
  const [selectedBottoms, setSelectedBottoms] = useState(0);
  const [selectedShoes, setSelectedShoes] = useState(0);

  const handleDress = () => {
    if (dress == false){
      setDress(true)
    } else {
      setDress(false)
    }
  }

  const handleJacket = () => {
    if (jacket == false){
      setJacket(true)
    } else {
      setJacket(false)
    }
  }


  const handleSelectedTop = (selectedIndex, e) => {
    setSelectedTop(selectedIndex);
  }

  const handleSelectedBottoms = (selectedIndex, e) => {
    setSelectedBottoms(selectedIndex);
  }

  const handleSelectedShoes = (selectedIndex, e) => {
    // console.log(shoes[selectedIndex]);
    if (selectedShoes != selectedIndex) {
      setSelectedShoes(selectedIndex);
    }
  }

  const saveSelectedFavourites = (e) => {
    // e.preventDefault();
    // if (!startAddress || !endAddress || !date || !time || !numSeats) {
    //   setError("All the fields are required");
    // } else {
    //   const uid = uuidv4();
    //   const ride = {
    //     top: selectedTop,
    //     bottom: selectedBottoms,
    //     shoes: selectedShoes
    //   };

    //   setError("");
    //   updateData({ ["/favourites/" + uid]: ride });
    //   updateData({ ["/chats/" + uid]: chat });
    //   navigate("/");
    // }
  };

  return <div>
    <Form.Check
        inline="true"
        label="Dress?"
        type="switch"
        onClick={() => handleDress()}
    />
    <Form.Check
        inline="true"
        label="Jacket?"
        type="switch"
        onClick={() => handleJacket()}
    />
    {tops && !dress && <MyCarousel data={tops} handleSelect={handleSelectedTop} index={selectedTop}></MyCarousel>}
    {bottoms && !dress && <MyCarousel data={bottoms} handleSelect={handleSelectedBottoms} index={selectedBottoms}></MyCarousel>}
    {shoes && <MyCarousel data={shoes} handleSelect={handleSelectedShoes} index={selectedShoes}></MyCarousel>}
    <div onClick={() => saveSelectedFavourites()}><AiOutlineHeart size={28}> Star </AiOutlineHeart></div>
    
    </div>;
      
};

export default Home;
