import React from "react";
import Container from "react-bootstrap/Container";
import FavoritesCard from "../components/FavoritesCard";
import { useDbData } from "../utils/firebase";
import getMockUser from "../utils/mockUser";

const Favorites = () => {
  const user = getMockUser();
  const [closet] = useDbData("/closet");

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container className="p-10 mt-3">
      <h3 className="closet-title">My Favorites</h3>
      <hr />
      {<FavoritesCard data={closet[user.uid].favorites} />}
    </Container>
  );
};

export default Favorites;
