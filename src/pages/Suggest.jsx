import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { IoMdArrowBack } from "react-icons/io";
import { useDbData } from "../utils/firebase";
import getMockUser from "../utils/mockUser";

const Suggest = () => {
  const navigate = useNavigate();
  const user = getMockUser();
  const [closet] = useDbData("/closet");

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container>
      <Container className="mt-1">
        <IoMdArrowBack size={20} onClick={() => navigate("/")} />
      </Container>
      SUGGEST SCREEN
    </Container>
  );
};

export default Suggest;
