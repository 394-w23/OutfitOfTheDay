import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const MyCard = ({ data }) => {
  return (
    <Container>
      <Row xs={2} md={4} className="g-4">
        {data?.map((img_src) => (
          <Col>
            <Card className="card-container">
              <Card.Img variant="top" src={img_src} className="card-image" />
              <Card.Title className="text-muted">Some Weather</Card.Title>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyCard;
