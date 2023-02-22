import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CameraUpload from "../components/Upload/CameraUpload";
import FileUpload from "../components/Upload/FileUpload";

const AddClothes = () => {
  const [method, setMethod] = useState(null);
  const [step, setStep] = useState(0);

  const handleCameraUpload = () => {
    setMethod("camera");
    setStep(1);
  };

  const handleDeviceUpload = () => {
    setMethod("device");
    setStep(1);
  };

  if (step === 0)
    return (
      <Container className="upload-container">
        <h4 className="add-title">
          Let's add <br /> your clothes
        </h4>
        <p className="add-subtitle">
          You can do this by taking photos of each piece, or adding a link to
          where you bought them from online
        </p>
        <Container className="add-button-container">
          <Button className="add-button" onClick={handleCameraUpload}>
            Use Camera
          </Button>
          <Button className="add-button" onClick={handleDeviceUpload}>
            Use File Upload
          </Button>
        </Container>
      </Container>
    );

  if (step === 1 && method === "device") return <FileUpload step={setStep} />;
  if (step === 1 && method === "camera") return <CameraUpload step={setStep} />;
};

export default AddClothes;
