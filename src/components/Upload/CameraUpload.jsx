import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { IoMdArrowBack } from "react-icons/io";
import AddClothesPanel from "./AddClothesPanel";
import WebCam from "./WebCam";

const CameraUpload = ({ step }) => {
  const [imgBytes, setImgBytes] = useState(null);

  return (
    <Container className="mt-3">
      <Container className="mb-2">
        <IoMdArrowBack size={24} onClick={() => step(0)} />
      </Container>
      {!imgBytes && <WebCam setImgBytes={setImgBytes} />}

      {imgBytes && (
        <Container>
          <Image className="add-image-camera" src={imgBytes} alt="camera" />
          <AddClothesPanel input={imgBytes} step={step} />
        </Container>
      )}
    </Container>
  );
};

export default CameraUpload;
