import React, { useState } from "react";
import MyCarousel from "../components/Carousel";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AiOutlineHeart } from "react-icons/ai";
import { useDbData } from "../utils/firebase";
import { useProfile } from "../utils/userProfile";

const Home = () => {
  const [user] = useProfile();

  const [tops] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");
  const [shoes] = useDbData("/shoes");
  const [dresses] = useDbData("/dress");
  const [jackets] = useDbData("/jacket");

  const [dress, setDress] = useState(false);
  const [jacket, setJacket] = useState(false);

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
          {tops && <MyCarousel data={tops}></MyCarousel>}
        </Container>
        <Container className="home-clothes-bottoms">
          {bottoms && <MyCarousel data={bottoms} bottoms></MyCarousel>}
        </Container>
        <Container className="home-clothes-shoes">
          {shoes && <MyCarousel data={shoes}></MyCarousel>}
        </Container>
      </Container>
      <Container className="home-button-container">
        <Button className="home-btn">I'll wear this today!</Button>
        <Button className="home-btn-fav">
          <AiOutlineHeart size={20} /> Save this look
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
