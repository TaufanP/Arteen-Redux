import React from "react";
import "../assets/css/navbar.css";

const Logout = (props) => {
  return (
    <div className="logout" onClick={() => props.handleLogout()}>
      <span className="logout-label">LOG OUT</span>
    </div>
  );
};

export default Logout;
