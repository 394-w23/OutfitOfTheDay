import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/login.css";
import "./styles/header.css";
import "./styles/build.css";
import "./styles/home.css";
import "./styles/bottom-nav.css";
import "./styles/carousel.css";
import "./styles/clothes-card.css";
import "./styles/outfit-modal.css";
import "./styles/favorites.css";
import "./styles/add-clothes.css";
import "./styles/landing-page.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
