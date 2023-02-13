import React from "react";
import MyCarousel from "./Carousel";
import { useDbData } from "../utils/firebase";

const Home = () => {
  const [tops] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");

  if (!tops) {
    return <div></div>;
  }
  return (
    <div>
      {/* OutfitOfTheDay */}
      <MyCarousel data={tops}></MyCarousel>
    </div>
  );
};

export default Home;
