import React from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { CgProfile } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "../../utils/firebase";
import { useProfile } from "../../utils/userProfile";
import getMockUser from "../../utils/mockUser";

const Header = () => {
  //const [user] = useProfile();
  const user = getMockUser();
  const navigate = useNavigate();

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;

  return (
    <Navbar className="navbar">
      <Container className="navbar-container">
        <Container className="navbar-logo">
          <img
            src="ootd-transparent.png"
            className="icon-image"
            onClick={() => navigate("/")}
          />
        </Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="header-dropdown">
          <IoMdAddCircle size={24} />
          {/* <Nav className="header-profile">
            <img
              className="header-img"
              alt="Profile"
              src={user.profilePic}
              referrerPolicy="no-referrer"
            /> */}
          <NavDropdown id="collasible-nav-dropdown" align="end">
            {/* <NavDropdown.Item onClick={() => navigate("/")}>
                <CgProfile size={24} /> View Profile
              </NavDropdown.Item> */}
            <NavDropdown.Item onClick={() => navigate("/add")}>
              <IoMdAddCircle size={24} /> Add Item
            </NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
            {/* <NavDropdown.Item onClick={() => navigate("/")}>
                <AiOutlineLogout size={24} /> Logout
              </NavDropdown.Item> */}
          </NavDropdown>
          {/* </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
