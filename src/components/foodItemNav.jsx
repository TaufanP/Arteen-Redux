import React from "react";
import "../assets/css/navbar.css";

const FoodItemNav = props => {
  return (
    <div className="app-title">
      <span className="title">{props.text}</span>
    </div>
  );
};

export default FoodItemNav;
