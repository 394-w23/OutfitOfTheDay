import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import Container from "react-bootstrap/Container";
import AddClothesPanel from "./AddClothesPanel";

const CameraUpload = ({ step }) => {
  return (
    <Container className="mt-3">
      <Container className="mb-2">
        <IoMdArrowBack size={24} onClick={() => step(0)} />
      </Container>
      Camera
      <AddClothesPanel />
    </Container>
  );
};

export default CameraUpload;
