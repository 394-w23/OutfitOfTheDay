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
  const [weatherFilter, setWeatherFilter] = useState(null);
  const weatherOptions = ["Cold", "Warm", "Rainy", "Sunny"];

  const handleFilter = (e) => {
    if (e === "Tops") {
      setOption("Tops");
      setFilter(closet[user.uid].tops);
      setWeatherFilter(closet[user.uid].tops);
    } else if (e === "Jackets") {
      setOption("Jackets");
      setFilter(closet[user.uid].jackets);
      setWeatherFilter(closet[user.uid].jackets);
    } else if (e === "Dresses") {
      setOption("Dresses");
      setFilter(closet[user.uid].dresses);
      setWeatherFilter(closet[user.uid].dresses);
    } else if (e === "Bottoms") {
      setOption("Bottoms");
      setFilter(closet[user.uid].bottoms);
      setWeatherFilter(closet[user.uid].bottoms);
    } else if (e === "Shoes") {
      setOption("Shoes");
      setFilter(closet[user.uid].shoes);
      setWeatherFilter(closet[user.uid].shoes)
    }
  };

  const handleWeather = (weather) => {
    let weatherType = weather.toLowerCase()
    let filteredClothes = new Object();
    for (const key in filter) {
      filter[key].weather.forEach(function (item, index) {
        if (item.includes(weatherType)) {
          filteredClothes[key] = filter[key];
        }
      });
    }
    if (filter == null){
      let top = closet[user.uid].tops
      for (const key in top) {
        top[key].weather.forEach(function (item, index) {
          if (item.includes(weatherType)) {
            filteredClothes[key] = top[key];
          }
        });
      }
    }
    setWeatherFilter(filteredClothes)
  }

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container className="p-10 mt-3">
      <h4 className="closet-title">My Closet</h4>
      <Form.Select onChange={(e) => handleFilter(e.target.value)}>
        <option value="Tops">Tops</option>
        <option value="Jackets">Jackets</option>
        <option value="Dresses">Dresses</option>
        <option value="Bottoms">Bottoms</option>
        <option value="Shoes">Shoes</option>
      </Form.Select>

      <Container className="card-text-container-header">
        {weatherOptions.map((weather, idx) => (
          <Button key={idx} className="filter-weather-button" onClick={(e) => handleWeather(weather)}>
            {weather}
          </Button>
        ))}
      </Container>

      <h5 className="text-muted mt-3">{option}</h5>
      {
        <Container>
          <Row xs={2} md={4} className="g-4">
            {Object.entries(weatherFilter ? weatherFilter : closet[user.uid].tops).map(
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
