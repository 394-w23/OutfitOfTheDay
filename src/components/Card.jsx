import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const MyCard = ({ data, bottoms }) => {
  return (
    <Container>
      <Row xs={2} md={4} className="g-4">
        {data?.map((img_src, idx) => (
          <Col key={idx}>
            <Card className="card-container">
              <Card.Img
                variant="top"
                src={img_src}
                className={bottoms ? "card-image-bottoms" : "card-image"}
              />
              <div className="card-text-container">
                <Card.Text className="card-weather text-muted">
                  Hot Weather
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
