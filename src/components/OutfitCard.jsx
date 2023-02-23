import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { AiFillHeart } from "react-icons/ai";
import { useDbUpdate } from "../utils/firebase";
import getMockUser from "../utils/mockUser";

const OutfitCard = ({ clothes, idx }) => {
  const user = getMockUser();
  const [updateData] = useDbUpdate("/");

  const removeFavorite = (idx) => {
    updateData({ ["/closet/" + user.uid + "/favorites/" + idx]: null });
  };

  return (
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
  );
};

export default OutfitCard;
