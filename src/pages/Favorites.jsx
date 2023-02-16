import React from "react";
import Container from "react-bootstrap/Container";
import FavoritesCard from "../components/FavoritesCard";
import { useDbData } from "../utils/firebase";

const Favorites = () => {
  const [favs] = useDbData("/favourites");

  if (!favs) return <h4 className="text-muted">Loading favorites...</h4>;

  return (
    <Container className="p-10 mt-3">
      <h3 className="closet-title">My Favorites</h3>
      <hr />
      {<FavoritesCard data={Object.entries(favs)} />}
    </Container>
  );
};

export default Favorites;
