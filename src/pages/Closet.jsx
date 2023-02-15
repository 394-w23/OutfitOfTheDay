import React, { useState, useEffect } from "react";
import MyCard from "../components/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import { useDbData } from "../utils/firebase";

const Closet = () => {
  const [tops] = useDbData("/tops");
  const [jackets] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");
  const [shoes] = useDbData("/shoes");
  const [dresses] = useDbData("/tops");

  const [options, setOptions] = useState([]);
  const [filter, setFilter] = useState("tops");

  const handleFilter = (e) => {
    console.log(e);
    setFilter(e);
  };

  useEffect(() => {
    if (tops && tops.length > 0) setOptions([...options, "tops"]);
    if (jackets && jackets.length > 0) setOptions([...options, "jackets"]);
    if (bottoms && bottoms.length > 0) setOptions([...options, "bottoms"]);
    if (shoes && shoes.length > 0) setOptions([...options, "shoes"]);
    if (dresses && dresses.length > 0) setOptions([...options, "dresses"]);
  }, []);

  return (
    <Container className="p-10">
      <h3>My Closet</h3>
      <hr />
      {options && (
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilter("tops")}>
              Tops
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter("jackets")}>
              Jackets
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter("dresses")}>
              Dresses
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter("bottoms")}>
              Bottoms
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter("shoes")}>
              Shoes
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      <h5 className="text-muted mt-3">Tops</h5>
      {tops && <MyCard data={tops}> </MyCard>}
      <h5 className="text-muted mt-5">Jackets</h5>
      {jackets && <MyCard data={jackets}> </MyCard>}
      <h5 className="text-muted mt-5">Bottoms</h5>
      {bottoms && <MyCard data={bottoms}> </MyCard>}
      <h5 className="text-muted mt-5">Dresses</h5>
      {dresses && <MyCard data={dresses}> </MyCard>}
      <h5 className="text-muted mt-5">Shoes</h5>
      {shoes && <MyCard data={shoes}> </MyCard>}
    </Container>
  );
};

export default Closet;
