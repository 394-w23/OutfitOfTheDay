import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
                <Card.Text className="card-weather text-muted">
                  {clothes.weather.charAt(0).toUpperCase() +
                    clothes.weather.slice(1)}{" "}
                  Weather
                </Card.Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyCard;
