import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OutfitCard from "./OutfitCard";
import { useDbUpdate } from "../utils/firebase";
import getTodaysDate from "../utils/todayDate";
import getMockUser from "../utils/mockUser";

const OutfitModal = ({ show, handleClose, clothes, idx }) => {
  const user = getMockUser();
  const [updateData] = useDbUpdate("/");
  const navigate = useNavigate();

  const handleWearBtn = () => {
    saveSelectedOutfit();
    navigate("/");
    handleClose();
  };

  const handleBuildBtn = () => {
    navigate("/build");
    handleClose();
  };

  const saveSelectedOutfit = () => {
    updateData({
      ["/closet/" + user.uid + "/outfits/" + idx]: {
        ...clothes,
        times: clothes.times + 1,
      },
    });
    updateData({
      ["/closet/" + user.uid + "/todays/" + idx]: {
        ...clothes,
        times: clothes.times + 1,
      },
    });
    updateData({
      ["/closet/" + user.uid + "/lastWorn"]: getTodaysDate(),
    });
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
            <OutfitCard clothes={clothes} idx={null} modalShown={false} big />
          </Modal.Body>
          <Modal.Footer className="outfit-modal-footer">
            <Button onClick={handleWearBtn}>I'll wear this today!</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default OutfitModal;
