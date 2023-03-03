import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OutfitCard from "./OutfitCard";

const OutfitModal = ({ show, handleClose, clothes }) => {
  const navigate = useNavigate();

  const handleWearBtn = () => {
    navigate("/");
    handleClose();
  };

  const handleBuildBtn = () => {
    navigate("/build");
    handleClose();
  };

  return (
    <>
      {clothes && (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton className="modal-header">
            <Modal.Title>
              You've worn this look {clothes.times}{" "}
              {clothes.times === 1 ? "time" : "times"}!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <OutfitCard clothes={clothes} idx={null} modalShown={true} big />
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button onClick={handleWearBtn}>I'll wear this today!</Button>
            <Container onClick={handleBuildBtn}>
              <h6>Build a look starting with this</h6>
            </Container>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default OutfitModal;
