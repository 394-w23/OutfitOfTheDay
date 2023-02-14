import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStorageUpdate } from "../utils/firebase";
import { useDbData } from "../utils/firebase";
import { useDbUpdate } from "../utils/firebase";

const Upload = () => {
  const [type, setType] = useState("shoes");
  const [useStorage, result] = useStorageUpdate("/files/" + uuidv4());
  const [updateData] = useDbUpdate("/");
  const [clothes] = useDbData(type);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    useStorage(file);
    const newClothes = clothes ? [...clothes, result] : [result];
    updateData({ ["/" + type + "/"]: newClothes });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="file" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;
