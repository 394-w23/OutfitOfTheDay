import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from "uuid";
import { useStorageUpdate } from "../../utils/firebase";
import { useDbData } from "../../utils/firebase";
import { useDbUpdate } from "../../utils/firebase";
import getMockUser from "../../utils/mockUser";
import { useProfile } from "../../utils/userProfile";

const AddClothesPanel = ({ input, step }) => {
  const navigate = useNavigate();
  const user = getMockUser();
  const [updateData] = useDbUpdate("/");
  const [isLoadingRed, setLoadingRed] = useState(false);
  const [isLoadingDon, setLoadingDon] = useState(false);
  const [type, setType] = useState(null);
  const [formality, setFormality] = useState(null);
  const [weather, setWeather] = useState([]);
  const [useStorage, result] = useStorageUpdate(
    "/files/" + user.uid + "/" + uuidv4()
  );
  const [closet] = useDbData("/closet");

  useEffect(() => {
    if (result) {
      handleDatabase();
    }
  }, [result]);

  const simulateLoadingRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleInputToFile = async () => {
    const response = await fetch(input);
    const blob = await response.blob();
    return new File([blob], "image.jpg", { type: blob.type });
  };

  const handleDatabase = () => {
    const userCloset = closet[user.uid];
    const userClosetType = userCloset[type];
    const uid = uuidv4();
    const newPiece = {
      id: uid,
      available: true,
      weather: weather,
      formality: formality,
      url: result,
    };

    const updatedClosetType = userClosetType
      ? { ...userClosetType, [uid]: newPiece }
      : { [uid]: newPiece };

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

    if (isLoadingRed) {
      setLoadingRed(false);
      step(0);
    } else {
      setLoadingDon(false);
      step(0);
      navigate("/");
    }
  };

  const handleUpload = async (redirect) => {
    if (weather.length === 0 || !type || !formality) return;
    redirect ? setLoadingRed(true) : setLoadingDon(true);
    const imgFile = await handleInputToFile();
    if (!imgFile) return;
    useStorage(imgFile);
    await simulateLoadingRequest();
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
            className={
              weather.includes("cold") ? "link-upload-button-active" : ""
            }
            onClick={() => {
              if (weather.includes("cold")) {
                setWeather(weather.filter((val) => val !== "cold"));
              } else {
                setWeather([...weather, "cold"]);
              }
            }}
          >
            Cold
          </Button>
          <Button
            className={
              weather.includes("warm") ? "link-upload-button-active" : ""
            }
            onClick={() => {
              if (weather.includes("warm")) {
                setWeather(weather.filter((val) => val !== "warm"));
              } else {
                setWeather([...weather, "warm"]);
              }
            }}
          >
            Warm
          </Button>
          <Button
            className={
              weather.includes("rainy") ? "link-upload-button-active" : ""
            }
            onClick={() => {
              if (weather.includes("rainy")) {
                setWeather(weather.filter((val) => val !== "rainy"));
              } else {
                setWeather([...weather, "rainy"]);
              }
            }}
          >
            Rainy
          </Button>
          <Button
            className={
              weather.includes("sunny") ? "link-upload-button-active" : ""
            }
            onClick={() => {
              if (weather.includes("sunny")) {
                setWeather(weather.filter((val) => val !== "sunny"));
              } else {
                setWeather([...weather, "sunny"]);
              }
            }}
          >
            Sunny
          </Button>
        </Container>
      </Container>
      <Container className="mt-2">
        <h5 className="link-upload-tag">I think this item is:</h5>
        <Container className="link-upload-weather-container">
          <Button
            className={
              formality === "casual" ? "link-upload-button-active" : ""
            }
            onClick={() => setFormality("casual")}
          >
            Casual
          </Button>
          <Button
            className={
              formality === "formal" ? "link-upload-button-active" : ""
            }
            onClick={() => setFormality("formal")}
          >
            Formal
          </Button>
        </Container>
      </Container>
      <Container className="mt-5 link-upload-buttons-container">
        <Button
          onClick={() => handleUpload(true)}
          disabled={isLoadingDon || isLoadingRed}
        >
          {isLoadingRed ? "Uploading..." : "Add another Item"}
        </Button>
        <Button
          onClick={() => handleUpload(false)}
          disabled={isLoadingDon || isLoadingRed}
        >
          {isLoadingDon ? "Uploading..." : "I'm done!"}
        </Button>
      </Container>
    </Container>
  );
};

export default AddClothesPanel;
