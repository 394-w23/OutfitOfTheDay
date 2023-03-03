import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OutfitCard from "../components/OutfitCard";
import { useDbData } from "../utils/firebase";
import getMockUser from "../utils/mockUser";
import { useLocation } from "react-router-dom";

const Outfits = () => {
  const user = getMockUser();
  const [closet] = useDbData("/closet");
  const [filter, setFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState([]);
  const { state } = useLocation();
  const { showFavorites } = state;

  const [isChecked, setIsChecked] = useState(
    showFavorites !== undefined ? showFavorites : false
  );
  const weatherOptions = ["cold", "warm", "rainy", "sunny"];

  useEffect(() => {
    handleFavoriteFilter();
  }, [isChecked, closet]);

  const handleWeather = (weather) => {
    let types = [...typeFilter];

    if (types.includes(weather)) {
      types = types.filter((type) => type !== weather);
    } else {
      types = [...typeFilter, weather];
    }

    if (types.length === 0) {
      setFilter(closet[user.uid].outfits);
      setTypeFilter([]);
      return;
    }

    setTypeFilter(types);
  };

  const handleFavoriteFilter = () => {
    if (closet) {
      if (isChecked) {
        let filteredOutfits = new Object();
        const outfits = closet[user.uid].outfits;
        for (const key in outfits) {
          if (outfits[key].isFavorite) {
            filteredOutfits[key] = outfits[key];
          }
        }
        setFilter(filteredOutfits);
      } else {
        setFilter(closet[user.uid].outfits);
      }
    }
  };

  const countFavorites = () => {
    if (closet) {
      let count = 0;
      const outfits = closet[user.uid].outfits;
      for (const key in outfits) {
        if (outfits[key].isFavorite) {
          count += 1;
        }
      }
      return count;
    }
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
            defaultChecked={showFavorites ? true : false}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </Form>
      </Container>
      <Container className="closet-cards-container">
        {closet[user.uid].outfits ? (
          <Row xs={2} md={4}>
            {Object.entries(filter ? filter : closet[user.uid].outfits).map(
              ([idx, clothes]) => (
                <Col key={idx}>
                  <OutfitCard clothes={clothes} idx={idx} modalShown={false} />
                </Col>
              )
            )}
          </Row>
        ) : (
          <Container className="mt-3">
            <h5 className="text-center text-muted">
              There are no outfits in your closet!
            </h5>
          </Container>
        )}
        {isChecked && countFavorites() === 0 && (
          <Container className="mt-3">
            <h5 className="text-center text-muted">
              There are no favorited outfits in your closet!
            </h5>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default Outfits;
