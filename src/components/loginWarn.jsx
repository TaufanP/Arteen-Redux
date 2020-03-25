import React, { Component } from "react";
import "../assets/css/loginWarn.css";

class Navbar extends Component {
  relogin = () => {
    this.props.history.push("/");
  };
  render() {
    if (localStorage.getItem("token") !== null) {
      this.props.history.push("/product");
    }
    return (
      <div>
        <div className="login-warn">You need to login first!</div>
        <div className="login-button" onClick={this.relogin}>
          LOG IN
        </div>
      </div>
    );
  }
}

export default Navbar;
