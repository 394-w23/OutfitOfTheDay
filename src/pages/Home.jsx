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
        <h5>Good Morning {user.displayName.split(" ")[0]}</h5>
        <h6 className="text-muted">
          Let's choose your outfit. <br />
          Here's what we suggest
        </h6>
      </Container>
      <Container>
        {tops && !dress && <MyCarousel data={tops}></MyCarousel>}
        {/* {jackets && jacket && <MyCarousel data={jackets}></MyCarousel>} */}
        {bottoms && !dress && <MyCarousel data={bottoms}></MyCarousel>}
        {dresses && dress && <MyCarousel data={dresses}></MyCarousel>}
        {shoes && <MyCarousel data={shoes}></MyCarousel>}
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
