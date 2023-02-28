import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { AiFillHeart } from "react-icons/ai";
import { TbHanger } from "react-icons/tb";
import { useDbUpdate } from "../utils/firebase";
import getMockUser from "../utils/mockUser";

const OutfitCard = ({ clothes, idx, big }) => {
  const user = getMockUser();
  const [updateData] = useDbUpdate("/");

  const removeFavorite = (idx) => {
    if (!idx) return;
    updateData({ ["/closet/" + user.uid + "/favorites/" + idx]: null });
  };

  return (
    <Card className="mb-3 favorites-card-container">
      <Container className="favorites-card-clothes">
        <Container className="favorites-top-shoes-container">
          <Container className={"favorites-top-container"}>
            <Card.Img
              variant="top"
              src={clothes.tops.url}
              className={
                big ? "big-favorites-card-image" : "favorites-card-image"
              }
            />
          </Container>
          <Container className={"favorites-shoes-container"}>
            <Card.Img
              variant="top"
              src={clothes.shoes.url}
              className={
                big
                  ? "big-favorites-card-image-shoes"
                  : "favorites-card-image-shoes"
              }
            />
          </Container>
        </Container>
        <Container className={"favorites-bottom-container"}>
          <Card.Img
            variant="top"
            src={clothes.bottoms.url}
            className={
              big
                ? "big-favorites-card-image-bottom"
                : "favorites-card-image-bottom"
            }
          />
        </Container>
      </Container>
      <Container className="favorites-card-footer">
        <Container className="favorites-card-frequency">
          <TbHanger className="me-1" size={23} />
          {clothes.times}
        </Container>
        <Container className="favorites-card-heart">
          <AiFillHeart onClick={() => removeFavorite(idx)} size={23} />
        </Container>
      </Container>
    </Card>
  );
};

export default OutfitCard;
