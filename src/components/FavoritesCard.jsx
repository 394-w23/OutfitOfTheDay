import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AiFillHeart } from "react-icons/ai";
import { useDbData, useDbUpdate } from "../utils/firebase";
import getMockUser from "../utils/mockUser";

const FavoritesCard = ({ data }) => {

  const [updateData] = useDbUpdate("/");

  const [closet] = useDbData("/closet");

  const user = getMockUser();

  const removeFavorite = (idx) => {
    // console.log(closet[user.uid].favorites[idx])
    updateData({ ["/closet/" + user.uid + "/favorites/" + idx]: null });
  }

  return (
    <Container>
      <Row xs={2} md={4} className="g-1">
        {Object.entries(data).map(([idx, clothes]) => (
          <Col key={idx}>
            <Card className="favorites-card-container">
              <Container className="favorites-card-clothes">
                <Container className="favorites-top-shoes-container">
                  <Container className="favorites-top-container">
                    <Card.Img
                      variant="top"
                      src={clothes.tops.url}
                      className={"favorites-card-image"}
                    />
                  </Container>
                  <Container className="favorites-shoes-container">
                    <Card.Img
                      variant="top"
                      src={clothes.shoes.url}
                      className={"favorites-card-image-shoes"}
                    />
                  </Container>
                </Container>
                <Container className="favorites-bottom-container">
                  <Card.Img
                    variant="top"
                    src={clothes.bottoms.url}
                    className={"favorites-card-image-bottom"}
                  />
                </Container>
              </Container>
              <Container className="favorites-card-heart">
                <AiFillHeart onClick={() => removeFavorite(idx)} size={15} />
              </Container>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesCard;
