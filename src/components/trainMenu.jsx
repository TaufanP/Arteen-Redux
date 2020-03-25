import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/trainMenu.css";

class TrainMenu extends Component {
  render() {
    return (
      <div>
        <div className="train-menu">
          <div className="add-button">
            <Link to="/product">
            <img
              src={require("../assets/images/list-products.svg")}
              alt="product"
            />
            </Link>
          </div>
          <div className="add-button">
            <Link to="/history">
              <img
                src={require("../assets/images/history.svg")}
                alt="history"
              />
            </Link>
          </div>
          <div
            className="add-button"
            onClick={e => {
              this.props.showModal();
            }}
          >
            <img src={require("../assets/images/add.svg")} alt="add product" />
          </div>
        </div>
      </div>
    );
  }
}

export default TrainMenu;
