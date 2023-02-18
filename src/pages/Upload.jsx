import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStorageUpdate } from "../utils/firebase";
import { useDbData } from "../utils/firebase";
import { useDbUpdate } from "../utils/firebase";
import { useProfile } from "../utils/userProfile";

const Upload = () => {
  const [user] = useProfile();
  const [type, setType] = useState("shoes");
  const [useStorage, result] = useStorageUpdate("/files/" + uuidv4());
  const [updateData] = useDbUpdate("/");
  const [closet] = useDbData("/closet");

  const handleSubmit = (e) => {
    console.log(user);
    e.preventDefault();
    const userCloset = closet[user.uid];
    const userClosetType = userCloset[type];
    const file = e.target[0]?.files[0];
    if (!file) return;
    useStorage(file);

    const updatedClosetType = userClosetType
      ? [...userClosetType, result]
      : [result];

    const updatedCloset = {
      ...userCloset,
      id: user.uid,
      type: updatedClosetType,
    };

    updateData({ ["/closet/" + user.uid]: updatedCloset });
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="file" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;