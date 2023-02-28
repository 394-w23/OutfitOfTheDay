import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { BsFillTrashFill } from "react-icons/bs";

const ClothesCard = ({ clothes, idx, bottoms }) => {
  const removePiece = (idx) => {};

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
