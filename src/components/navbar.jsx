import React from "react";
import "../assets/css/navbar.css";
import FoodItemNav from "./foodItemNav";
import SearchBarNav from "./searchBarNav";
import Logout from "./logout";
import CartHeader from "./cartHeader";

const Navbar = (props) => {
  return (
    <div>
      <div className="navbar">
        <div className="menu">
          <img src={require("../assets/images/menu.svg")} alt="humb menu" />
        </div>
        <FoodItemNav text={"Food Items"} />
        <SearchBarNav />
        <Logout handleLogout={props.handleLogout} />
        <CartHeader cart={props.cart} />
      </div>
    </div>
  );
};

export default Navbar;
