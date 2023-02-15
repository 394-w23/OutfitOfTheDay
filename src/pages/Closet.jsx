import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useDbData } from "../utils/firebase";

import MyCard from "../components/Card";
import { Container } from "react-bootstrap";

const Closet = () => {
  const [tops] = useDbData("/tops");
  const [jackets] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");
  const [shoes] = useDbData("/shoes");
  const [dresses] = useDbData("/tops");

  return (
    <Container className="p-3 mb-10">
      <h3>My Closet</h3>
      <hr />
      <h5 className="text-muted mt-3">Tops</h5>
      {tops && <MyCard data={tops}> </MyCard>}
      <h5 className="text-muted mt-3">Jackets</h5>
      {jackets && <MyCard data={jackets}> </MyCard>}
      <h5 className="text-muted mt-3">Bottoms</h5>
      {bottoms && <MyCard data={bottoms}> </MyCard>}
      <h5 className="text-muted mt-3">Dresses</h5>
      {dresses && <MyCard data={dresses}> </MyCard>}
      <h5 className="text-muted mt-3">Shoes</h5>
      {shoes && <MyCard data={shoes}> </MyCard>}
    </Container>
  );
};

export default Closet;
