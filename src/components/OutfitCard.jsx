import { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbHanger } from "react-icons/tb";
import { useDbUpdate } from "../utils/firebase";
import getMockUser from "../utils/mockUser";
import OutfitModal from "./OutfitModal";

const OutfitCard = ({ clothes, idx, big }) => {
  const user = getMockUser();
  const [updateData] = useDbUpdate("/");
  const [show, setShow] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (piece) => {
    setSelectedPiece(piece);
    setShow(true);
  };

  const handleFavorite = () => {
    if (!idx) return;
    const isFavorite = clothes.isFavorite;
    updateData({
      ["/closet/" + user.uid + "/outfits/" + idx]: {
        ...clothes,
        isFavorite: !isFavorite,
      },
    });
  };

  return (
    <>
      <Card className="mb-3 outfits-card-container">
        <Container
          className="outfits-card-clothes"
          onClick={() => handleShow(clothes)}
        >
          <Container className="outfits-top-shoes-container">
            <Container className={"outfits-top-container"}>
              <Card.Img
                variant="top"
                src={clothes.tops.url}
                className={
                  big ? "big-outfits-card-image" : "outfits-card-image"
                }
              />
            </Container>
            <Container className={"outfits-shoes-container"}>
              <Card.Img
                variant="top"
                src={clothes.shoes.url}
                className={
                  big
                    ? "big-outfits-card-image-shoes"
                    : "outfits-card-image-shoes"
                }
              />
            </Container>
          </Container>
          <Container className={"outfits-bottom-container"}>
            <Card.Img
              variant="top"
              src={clothes.bottoms.url}
              className={
                big
                  ? "big-outfits-card-image-bottom"
                  : "outfits-card-image-bottom"
              }
            />
          </Container>
        </Container>
        <Container className="outfits-card-footer">
          <Container className="outfits-card-frequency">
            <TbHanger className="me-1" size={23} />
            {clothes.times}
          </Container>
          <Container className="outfits-card-heart">
            {clothes.isFavorite ? (
              <AiFillHeart onClick={() => handleFavorite()} size={23} />
            ) : (
              <AiOutlineHeart onClick={() => handleFavorite()} size={23} />
            )}
          </Container>
        </Container>
      </Card>
      <OutfitModal
        show={show}
        handleClose={handleClose}
        clothes={selectedPiece}
      />
    </>
  );
};

export default OutfitCard;
