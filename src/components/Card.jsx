import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const MyCard = ({ data }) => {
    return <div>
    <Row xs={1} md={2} className="g-4">
      {data?.map((img_src) => (
        <Col>
          <Card>
            <Card.Img variant="top" src={img_src} />
            <Card.Title>Some Weather</Card.Title>
          </Card>
        </Col>
      ))}
    </Row>
  </div>;
};
  
  export default MyCard;