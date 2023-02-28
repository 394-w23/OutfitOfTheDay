import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { BsFillTrashFill } from "react-icons/bs";
import { useDbData, useDbUpdate } from "../utils/firebase";
import getMockUser from "../utils/mockUser";
import { useReducer } from "react";

const ClothesCard = ({ clothes, idx, bottoms, option }) => {

  const [closet] = useDbData("/closet");
  const [updateData] = useDbUpdate("/");
  const user = getMockUser();

  const favOptions = ["tops", "bottoms", "shoes"]

  const removePiece = (idx) => {
    updateData({ ["/closet/" + user.uid + "/" + option.toLowerCase() + "/" + idx]: null });
    if (closet && favOptions.includes(option.toLowerCase())) {
      Object.entries(closet[user.uid].favorites).map(([ind, favorite]) => {
        if (
          clothes.url === favorite[option.toLowerCase()].url
        ) {
          updateData({ ["/closet/" + user.uid + "/favorites/" + ind]: null });
        }
      });
    }
  };

  return (
    <Card className="card-container">
      <Card.Img
        variant="top"
        src={clothes.url}
        className={bottoms ? "card-image-bottoms" : "card-image"}
      />
      <Container className="card-text-container">
        {clothes.weather.map((weather_attributes) => (
          <Badge
            key={weather_attributes}
            bg="secondary"
            className="card-weather"
            pill
          >
            {weather_attributes}
          </Badge>
        ))}
      </Container>
      <Container className="card-trash-container">
        <BsFillTrashFill onClick={() => removePiece(idx)} size={23} />
      </Container>
    </Card>
  );
};

export default ClothesCard;
