import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from "uuid";
import { useStorageUpdate } from "../../utils/firebase";
import { useDbData } from "../../utils/firebase";
import { useDbUpdate } from "../../utils/firebase";
import getMockUser from "../../utils/mockUser";
import { useProfile } from "../../utils/userProfile";

const AddClothesPanel = ({ input }) => {
  //const [user] = useProfile();
  const user = getMockUser();
  const [type, setType] = useState(null);
  const [weather, setWeather] = useState(null);
  const [useStorage, result] = useStorageUpdate(
    "/files/" + user.uid + "/" + uuidv4()
  );
  const [updateData] = useDbUpdate("/");
  const [closet] = useDbData("/closet");

  const handleInputToFile = async () => {
    const response = await fetch(input);
    const blob = await response.blob();
    return new File([blob], "image.jpg", { type: blob.type });
  };

  const handleSubmit = async () => {
    if (!weather || !type) return;
    const imgFile = await handleInputToFile();

    const userCloset = closet[user.uid];
    const userClosetType = userCloset[type];
    if (!imgFile) return;
    useStorage(imgFile);

    if (!result) return;

    const newPiece = {
      weather: weather,
      url: result,
    };

    const updatedClosetType = userClosetType
      ? [...userClosetType, newPiece]
      : [newPiece];

    if (type === "tops") {
      userCloset.tops = updatedClosetType;
    } else if (type === "jackets") {
      userCloset.jackets = updatedClosetType;
    } else if (type === "dresses") {
      userCloset.dresses = updatedClosetType;
    } else if (type === "bottoms") {
      userCloset.bottoms = updatedClosetType;
    } else if (type === "shoes") {
      userCloset.shoes = updatedClosetType;
    }

    updateData({ ["/closet/" + user.uid]: userCloset });
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;

  return (
    <Container className="mt-2">
      <Container>
        <h5 className="link-upload-tag">Category:</h5>
        <Container className="link-upload-category-container">
          <Button
            className={type === "tops" ? "link-upload-button-active" : ""}
            onClick={() => setType("tops")}
          >
            Top
          </Button>
          <Button
            className={type === "jackets" ? "link-upload-button-active" : ""}
            onClick={() => setType("jackets")}
          >
            Jacket
          </Button>
          <Button
            className={type === "bottoms" ? "link-upload-button-active" : ""}
            onClick={() => setType("bottoms")}
          >
            Bottom
          </Button>
          <Button
            className={type === "shoes" ? "link-upload-button-active" : ""}
            onClick={() => setType("shoes")}
          >
            Shoes
          </Button>
          <Button
            className={type === "dresses" ? "link-upload-button-active" : ""}
            onClick={() => setType("dresses")}
          >
            Dress
          </Button>
        </Container>
      </Container>
      <Container className="mt-2">
        <h5 className="link-upload-tag">I'll wear this when it's:</h5>
        <Container className="link-upload-weather-container">
          <Button
            className={weather === "cold" ? "link-upload-button-active" : ""}
            onClick={() => setWeather("cold")}
          >
            Cold
          </Button>
          <Button
            className={weather === "warm" ? "link-upload-button-active" : ""}
            onClick={() => setWeather("warm")}
          >
            Warm
          </Button>
          <Button
            className={weather === "rainy" ? "link-upload-button-active" : ""}
            onClick={() => setWeather("rainy")}
          >
            Rainy
          </Button>
          <Button
            className={weather === "sunny" ? "link-upload-button-active" : ""}
            onClick={() => setWeather("sunny")}
          >
            Sunny
          </Button>
        </Container>
      </Container>
      <Container className="mt-5 link-upload-buttons-container">
        <Button>Add another Item</Button>
        <Button onClick={handleSubmit}>I'm done!</Button>
      </Container>
    </Container>
  );
};

export default AddClothesPanel;
