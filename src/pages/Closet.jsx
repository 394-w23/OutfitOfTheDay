import React, { useState, useEffect } from "react";
import MyCard from "../components/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useDbData } from "../utils/firebase";
import getMockUser from "../utils/mockUser";

const Closet = () => {
  const user = getMockUser();
  const [closet] = useDbData("/closet");
  const [option, setOption] = useState("Tops");
  const [filter, setFilter] = useState(null);

  const handleFilter = (e) => {
    if (e === "Tops") {
      setOption("Tops");
      setFilter(closet[user.uid].tops);
    } else if (e === "Jackets") {
      setOption("Jackets");
      setFilter(closet[user.uid].jackets);
    } else if (e === "Dresses") {
      setOption("Dresses");
      setFilter(closet[user.uid].dresses);
    } else if (e === "Bottoms") {
      setOption("Bottoms");
      setFilter(closet[user.uid].bottoms);
    } else if (e === "Shoes") {
      setOption("Shoes");
      setFilter(closet[user.uid].shoes);
    }
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container className="p-10 mt-3">
      <h3 className="closet-title">My Closet</h3>
      <hr />

      <Form.Select onChange={(e) => handleFilter(e.target.value)}>
        <option value="Tops">Tops</option>
        <option value="Jackets">Jackets</option>
        <option value="Dresses">Dresses</option>
        <option value="Bottoms">Bottoms</option>
        <option value="Shoes">Shoes</option>
      </Form.Select>
      <h5 className="text-muted mt-3">{option}</h5>
      {
        <MyCard
          data={filter ? filter : closet[user.uid].tops}
          bottoms={option === "Bottoms" ? true : false}
        />
      }
    </Container>
  );
};

export default Closet;
