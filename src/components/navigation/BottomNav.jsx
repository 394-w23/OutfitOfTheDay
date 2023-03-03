import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import { RiLayout4Fill, RiLayout4Line } from "react-icons/ri";
import { BiCloset } from "react-icons/bi";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const iconsSize = 28;
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (location.pathname === "/outfits") {
      setActive("outfits");
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
          active === "outfits"
            ? "outfits-btn-container active-container"
            : "outfits-btn-container"
        }
        onClick={() => navigate("/outfits")}
      >
        <div className="info-container">
          {active === "outfits" ? (
            <RiLayout4Fill size={iconsSize} />
          ) : (
            <RiLayout4Line size={iconsSize} />
          )}
          <br />
          Outfits
        </div>
      </div>
      <div
        className={
          active === "home"
            ? "home-btn-container active-container"
            : "home-btn-container"
        }
        onClick={() => navigate("/")}
      >
        <div className="info-container">
          {active === "home" ? (
            <HiHome size={iconsSize} />
          ) : (
            <HiOutlineHome size={iconsSize} />
          )}
          <br />
          Home
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
          <BiCloset size={iconsSize} />
          <br />
          Closet
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
