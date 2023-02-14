import React from "react";
import MyCarousel from "../components/Carousel";
import { useDbData } from "../utils/firebase";

const Home = () => {
  const [tops] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");

  return <div>{tops && <MyCarousel data={tops}></MyCarousel>}</div>;
};

export default Home;
