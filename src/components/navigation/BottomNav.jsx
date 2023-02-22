import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiCloset } from "react-icons/bi";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (location.pathname === "/favorites") {
      setActive("favorites");
    } else if (location.pathname === "/closet") {
      setActive("closet");
    } else if (location.pathname === "/home") {
      setActive("home");
    }
  }, [location]);

  return (
    <div className="bottom-container">
      <div
        className={
          active === "favorites"
            ? "favorites-btn-container active-container"
            : "favorites-btn-container"
        }
        onClick={() => navigate("/favorites")}
      >
        <div className="info-container">
          {active === "favorites" ? (
            <AiFillHeart size={20} />
          ) : (
            <AiOutlineHeart size={20} />
          )}
          <p>Favorites</p>
        </div>
      </div>
      <div
        className={
          active === "home"
            ? "home-btn-container active-container"
            : "home-btn-container"
        }
        onClick={() => navigate("/home")}
      >
        <div className="info-container">
          {active === "home" ? (
            <HiHome size={20} />
          ) : (
            <HiOutlineHome size={20} />
          )}
          <p>Home</p>
        </div>
      </div>
      <div
        className={
          active === "closet"
            ? "closet-btn-container active-container"
            : "closet-btn-container"
        }
        onClick={() => navigate("/closet")}
      >
        <div className="info-container">
          <BiCloset size={20} />
          <p>Closet</p>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
