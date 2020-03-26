import React from "react";
import "../assets/css/navbar.css";
import FoodItemNav from "./foodItemNav";

const Header = () => {
    return (
      <div>
        <div className="navbar">
          <div className="menu">
            <img src={require("../assets/images/menu.svg")} alt="humb menu" />
          </div>
          <FoodItemNav text={"History"} />
        </div>
      </div>
    );
  }

export default Header;
