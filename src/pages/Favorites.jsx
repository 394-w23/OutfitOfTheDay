import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OutfitCard from "../components/OutfitCard";
import { useDbData } from "../utils/firebase";
import getMockUser from "../utils/mockUser";

const Favorites = () => {
  const user = getMockUser();
  const [closet] = useDbData("/closet");

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container className="p-10 mt-3">
      <h4 className="closet-title">My Favorites</h4>
      <Container>
        <Row xs={2} md={4}>
          {Object.entries(closet[user.uid].favorites).map(([idx, clothes]) => (
            <Col key={idx}>
              <OutfitCard clothes={clothes} idx={idx} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Favorites;
