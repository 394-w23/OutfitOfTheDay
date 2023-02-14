import React, { useState } from "react";

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDbData } from "../utils/firebase";

import MyCard from "../components/Card";




const Closet = () => {
  const [tops] = useDbData("/tops");
  const [bottoms] = useDbData("/bottoms");
  const [shoes] = useDbData("/shoes");


  return <div>
    <h3>Tops</h3>
    {tops && <MyCard data={tops}> </MyCard>}
    <h3>Bottoms</h3>
    {bottoms && <MyCard data={bottoms}> </MyCard>}
    <h3>Shoes</h3>
    {shoes && <MyCard data={shoes}> </MyCard>}


  </div>;
};

export default Closet;
