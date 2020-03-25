import React, { Component } from "react";
import "../assets/css/navbar.css";

class Logout extends Component {
  render() {
    return (
      <div className="logout" onClick = {()=>this.props.handleLogout()}>
        <span className="logout-label">LOG OUT</span>
      </div>
    );
  }
}

export default Logout;
