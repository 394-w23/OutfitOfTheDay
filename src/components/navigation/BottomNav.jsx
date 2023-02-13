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
    } else if (location.pathname === "/") {
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
        {active === "favorites" ? (
          <AiFillHeart size={28} />
        ) : (
          <AiOutlineHeart size={28} />
        )}
        <p>Favorites</p>
      </div>
      <div
        className={
          active === "home"
            ? "home-btn-container active-container"
            : "home-btn-container"
        }
        onClick={() => navigate("/")}
      >
        {active === "home" ? <HiHome size={28} /> : <HiOutlineHome size={28} />}
        <p>Home</p>
      </div>
      <div
        className={
          active === "closet"
            ? "closet-btn-container active-container"
            : "closet-btn-container"
        }
        onClick={() => navigate("/closet")}
      >
        <BiCloset size={28} />
        <p>Closet</p>
      </div>
    </div>
  );
};

export default BottomNav;
