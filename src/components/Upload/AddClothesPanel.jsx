import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from "uuid";
import { useStorageUpdate } from "../../utils/firebase";
import { useDbData } from "../../utils/firebase";
import { useDbUpdate } from "../../utils/firebase";
import getMockUser from "../../utils/mockUser";
import { useProfile } from "../../utils/userProfile";

const AddClothesPanel = () => {
  //const [user] = useProfile();
  const user = getMockUser();
  const [type, setType] = useState("jackets");
  const [useStorage, result] = useStorageUpdate(
    "/files/" + user.uid + "/" + uuidv4()
  );
  const [updateData] = useDbUpdate("/");
  const [closet] = useDbData("/closet");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCloset = closet[user.uid];
    const userClosetType = userCloset[type];
    const file = e.target[0]?.files[0];
    if (!file) return;
    useStorage(file);

    const updatedClosetType = userClosetType
      ? [...userClosetType, result]
      : [result];

    if (type === "tops") {
      userCloset.tops = updatedClosetType;
    } else if (type === "jackets") {
      userCloset.jackets = updatedClosetType;
    } else if (type === "dresses") {
      userCloset.dresses = updatedClosetType;
    } else if (type === "bottoms") {
      userCloset.bottoms = updatedClosetType;
    } else if (type === "shoes") {
      userCloset.shoes = updatedClosetType;
    }

    updateData({ ["/closet/" + user.uid]: userCloset });
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;

  return <Container>Panel</Container>;
};

export default AddClothesPanel;
