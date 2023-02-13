import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { signOut } from "../../utils/firebase";
import { useProfile } from "../../utils/userProfile";

const Header = () => {
  const [user] = useProfile();
  const navigate = useNavigate();

  return (
    <Row className="mb-3 p-0 w-100 m-0">
      <Navbar className="p-3 navbar">
        <Container className="navbar-container">
          <div className="navbar-brand" onClick={() => navigate("/")}>
            Outfit Of The Day
          </div>
        </Container>
      </Navbar>
    </Row>
  );
};

export default Header;
