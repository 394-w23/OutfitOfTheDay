import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

const ClothesCard = ({ clothes, bottoms }) => {
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
    </Card>
  );
};

export default ClothesCard;
