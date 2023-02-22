import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

const MyCard = ({ data, bottoms }) => {
  return (
    <Container>
      <Row xs={2} md={4} className="g-4">
        {Object.entries(data).map(([idx, clothes]) => (
          <Col key={idx}>
            <Card className="card-container">
              <Card.Img
                variant="top"
                src={clothes.url}
                className={bottoms ? "card-image-bottoms" : "card-image"}
              />
              <div className="card-text-container">
                {clothes.weather.map((weather_attributes) => (
                  <Button
                    className="card-weather text-muted"
                    key={weather_attributes}
                    disabled
                  >
                    {weather_attributes}
                  </Button>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyCard;
