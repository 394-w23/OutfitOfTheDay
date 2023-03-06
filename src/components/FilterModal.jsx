import React from "react";
import { GoSettings } from "react-icons/go";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const FilterModal = ({
  show,
  handleClose,
  formality,
  setFormality,
  weatherFilter,
  setWeatherFilter,
}) => {
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="filter-modal-title">
            <GoSettings size={28} /> Filter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="filter-modal-body">
          <Container>
            <h6>Weather Filters:</h6>
          </Container>
          <Container>
            <Button
              className={
                weatherFilter === "today" ? "filter-modal-button-active" : ""
              }
              onClick={() => setWeatherFilter("today")}
            >
              Outfits for today's weather
            </Button>
            <Button
              className={
                weatherFilter === "warm" ? "filter-modal-button-active" : ""
              }
              onClick={() => setWeatherFilter("warm")}
            >
              Outfits for warm weather
            </Button>
            <Button
              className={
                weatherFilter === "cold" ? "filter-modal-button-active" : ""
              }
              onClick={() => setWeatherFilter("cold")}
            >
              Outfits for cold weather
            </Button>
          </Container>
        </Modal.Body>
        <Modal.Footer className="filter-modal-footer">
          <Container>
            <h6>Occasion Filters:</h6>
          </Container>
          <Container className="build-header-toggle">
            <ButtonGroup className="formality-toggle">
              <ToggleButton
                id="radio-formal-2"
                size="sm"
                type="radio"
                name="radio"
                value="formal"
                variant={formality === "formal" ? "dark" : "light"}
                checked={formality === "formal"}
                onChange={(e) => setFormality(e.currentTarget.value)}
              >
                Formal
              </ToggleButton>
              <ToggleButton
                id="radio-casual-2"
                size="sm"
                type="radio"
                name="radio"
                value="casual"
                variant={formality === "casual" ? "dark" : "light"}
                checked={formality === "casual"}
                onChange={(e) => setFormality(e.currentTarget.value)}
              >
                Casual
              </ToggleButton>
            </ButtonGroup>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterModal;
