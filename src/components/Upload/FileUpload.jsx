import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { HiChevronRight } from "react-icons/hi";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import AddClothesPanel from "./AddClothesPanel";

const FileUpload = ({ step }) => {
  const [link, setLink] = useState();
  const [finishedURL, setFinishedURL] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const loadImage = () => {
    setFinishedURL(true);
    setIsValid(true);
  };

  const handleLoadEnter = (e) => {
    if (e.keyCode === 13) {
      loadImage;
      setIsValid(true);
    }
  };

  return (
    <Container className="mt-3">
      <Container className="mb-2">
        <IoMdArrowBack size={24} onClick={() => step(0)} />
      </Container>
      <Container className="mb-3">
        <h4 className="add-title">Add via file upload</h4>
        <Container className="link-upload-form">
          <Form.Control
            type="text"
            placeholder="Enter your link..."
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={(e) => handleLoadEnter(e)}
          />
          <HiChevronRight className="ps-2" size={38} onClick={loadImage} />
        </Container>
      </Container>
      {finishedURL && isValid && (
        <Container className="add-image-container">
          <Image
            className="add-image"
            src={link}
            onError={() => setIsValid(false)}
          />
        </Container>
      )}
      {finishedURL && !isValid && (
        <h4 className="text-center text-muted">Invalid Image</h4>
      )}
      {finishedURL && isValid && <AddClothesPanel input={link} />}
    </Container>
  );
};

export default FileUpload;
