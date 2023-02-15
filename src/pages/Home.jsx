import React, { useState } from "react";
import MyCarousel from "../components/Carousel";
import { useDbData } from "../utils/firebase";
import Form from "react-bootstrap/Form";

const Home = () => {
  const [tops] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");
  const [shoes] = useDbData("/shoes");
  const [dresses] = useDbData("/dress");
  const [jackets] = useDbData("/jacket");

  const [dress, setDress] = useState(false);
  const [jacket, setJacket] = useState(false);

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

  return <div>
    <Form.Check
        inline="true"
        label="Dress?"
        type="switch"
        onClick={() => handleDress()}
    />
    {/* <Form.Check
        inline="true"
        label="Jacket?"
        type="switch"
        onClick={() => handleJacket()}
    /> */}
    {tops && !dress && <MyCarousel data={tops}></MyCarousel>}
    {/* {jackets && jacket && <MyCarousel data={jackets}></MyCarousel>} */}
    {bottoms && !dress && <MyCarousel data={bottoms}></MyCarousel>}
    {dresses && dress && <MyCarousel data={dresses}></MyCarousel>}
    {shoes && <MyCarousel data={shoes}></MyCarousel>}</div>;
};

export default Home;
