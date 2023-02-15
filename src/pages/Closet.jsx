import React, { useState, useEffect } from "react";
import MyCard from "../components/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useDbData } from "../utils/firebase";

const Closet = () => {
  const [tops] = useDbData("/tops");
  const [jackets] = useDbData("/jacket");
  const [bottoms] = useDbData("/bottoms");
  const [shoes] = useDbData("/shoes");
  const [dresses] = useDbData("/dress");
  const [option, setOption] = useState("Tops");
  const [filter, setFilter] = useState(tops);

  const handleFilter = (e) => {
    if (e === "Tops") {
      setOption("Tops");
      setFilter(tops);
      console.log(tops);
    } else if (e === "Jackets") {
      setOption("Jackets");
      setFilter(jackets);
    } else if (e === "Dresses") {
      setOption("Dresses");
      setFilter(dresses);
    } else if (e === "Bottoms") {
      setOption("Bottoms");
      setFilter(bottoms);
    } else if (e === "Shoes") {
      setOption("Shoes");
      setFilter(shoes);
    }
  };

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
          data={filter ? filter : tops}
          bottoms={option === "Bottoms" ? true : false}
        />
      }
    </Container>
  );
};

export default Closet;
