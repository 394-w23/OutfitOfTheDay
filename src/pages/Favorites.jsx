import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OutfitCard from "../components/OutfitCard";
import { useDbData } from "../utils/firebase";
import getMockUser from "../utils/mockUser";
import OutfitModal from "../components/OutfitModal";

const Favorites = () => {
  const user = getMockUser();
  const [closet] = useDbData("/closet");
  const [show, setShow] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (piece) => {
    setSelectedPiece(piece);
    setShow(true);
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container className="p-10 mt-3">
      <h4 className="closet-title">My Favorites</h4>
      {
        <Container>
          <Row xs={2} md={4} className="g-1">
            {Object.entries(closet[user.uid].favorites).map(
              ([idx, clothes]) => (
                <Col key={idx} onClick={() => handleShow(clothes)}>
                  <OutfitCard clothes={clothes} idx={idx} />
                </Col>
              )
            )}
          </Row>
        </Container>
      }
      <OutfitModal
        show={show}
        handleClose={handleClose}
        clothes={selectedPiece}
      />
    </Container>
  );
};

export default Favorites;
