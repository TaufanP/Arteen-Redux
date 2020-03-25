import React, { Component } from "react";
import "../assets/css/navbar.css";
import FoodItemNav from "./foodItemNav";
import SearchBarNav from "./searchBarNav";
import Logout from "./logout";
import CartHeader from "./cartHeader";

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <div className="menu">
            <img src={require("../assets/images/menu.svg")} alt="humb menu" />
          </div>
          <FoodItemNav text={'Food Items'}/>
          <SearchBarNav />
          <Logout handleLogout = {this.props.handleLogout}/>
          <CartHeader cart={this.props.cart} />
        </div>
      </div>
    );
  }
}

export default Navbar;
