import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OutfitCard from "../components/OutfitCard";
import { useDbData } from "../utils/firebase";
import getMockUser from "../utils/mockUser";

const Outfits = () => {
  const user = getMockUser();
  const [closet] = useDbData("/closet");
  const [weatherFilter, setWeatherFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const weatherOptions = ["cold", "warm", "rainy", "sunny"];

  const handleWeather = (weather) => {
    let types = [...typeFilter];

    if (types.includes(weather)) {
      types = types.filter((type) => type !== weather);
    } else {
      types = [...typeFilter, weather];
    }

    if (types.length === 0) {
      setWeatherFilter(closet[user.uid].favorites);
      setTypeFilter([]);
      return;
    }

    setTypeFilter(types);
  };

  const handleCheckFavorite = (e) => {
    setIsChecked(e.target.checked);
  };

  if (!user) return <h5 className="text-muted">Loading user profile...</h5>;
  if (!closet) return <h5 className="text-muted">Loading user closet...</h5>;

  return (
    <Container className="p-10 mt-3">
      <h4 className="closet-title">My Past Outfits</h4>
      <Container className="m-0 p-0 card-text-container-header">
        {weatherOptions.map((weather, idx) => (
          <Button
            key={idx}
            variant="light"
            className={
              typeFilter.includes(weather)
                ? "weather-filter-active"
                : "filter-weather-button"
            }
            onClick={() => handleWeather(weather)}
          >
            {weather.charAt(0).toUpperCase()}
            {weather.slice(1)}
          </Button>
        ))}
      </Container>
      <Container className="p-0 outfits-checkbox-container">
        <Form>
          <Form.Check
            type="checkbox"
            inline
            label="Show favorites only"
            onChange={(e) => handleCheckFavorite(e)}
          />
        </Form>
      </Container>
      <Container className="closet-cards-container">
        <Row xs={2} md={4}>
          {Object.entries(closet[user.uid].favorites).map(([idx, clothes]) => (
            <Col key={idx}>
              <OutfitCard clothes={clothes} idx={idx} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Outfits;
