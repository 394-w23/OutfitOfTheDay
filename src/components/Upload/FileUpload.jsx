import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { HiChevronRight } from "react-icons/hi";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import AddClothesPanel from "./AddClothesPanel";

const FileUpload = ({ step }) => {
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(true);

  return (
    <Container className="mt-3">
      <Container className="mb-2">
        <IoMdArrowBack size={24} onClick={() => step(0)} />
      </Container>
      <Container className="mb-3">
        <h4 className="add-title">Add via file upload</h4>
        <Container className="link-upload-form">
          <Form.Control
            type="file"
            size="sm"
            accept="image/*"
            onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
          />
        </Container>
      </Container>
      {file && isValid && (
        <Container className="add-image-container">
          <Image
            className="add-image"
            src={file}
            onError={() => setIsValid(false)}
          />
        </Container>
      )}
      {file && !isValid && (
        <h4 className="text-center text-muted">Invalid Image</h4>
      )}
      {file && isValid && <AddClothesPanel input={file} step={step} />}
    </Container>
  );
};

export default FileUpload;
