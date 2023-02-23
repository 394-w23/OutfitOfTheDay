import React, { useState } from "react";
import ClothesCard from "../components/ClothesCard";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useDbData } from "../utils/firebase";
import getMockUser from "../utils/mockUser";
import { Button } from "react-bootstrap";

const Closet = () => {
  const user = getMockUser();
  const [closet] = useDbData("/closet");
  const [option, setOption] = useState("Tops");
  const [filter, setFilter] = useState(null);
  const weatherOptions = ["Cold", "Warm", "Rainy", "Sunny"];

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

      <Container className="card-text-container-header">
        {weatherOptions.map((weather, idx) => (
          <Button key={idx} className="filter-weather-button">
            {weather}
          </Button>
        ))}
      </Container>

      <h5 className="text-muted mt-3">{option}</h5>
      {
        <Container>
          <Row xs={2} md={4} className="g-4">
            {Object.entries(filter ? filter : closet[user.uid].tops).map(
              ([idx, clothes]) => (
                <Col key={idx}>
                  <ClothesCard
                    clothes={clothes}
                    bottoms={option === "Bottoms" ? true : false}
                  />
                </Col>
              )
            )}
          </Row>
        </Container>
      }
    </Container>
  );
};

export default Closet;
