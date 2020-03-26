import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/trainMenu.css";
import { connect } from "react-redux";
import { addModal } from "../redux/actions/product";

const TrainMenu = props => {
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
            <img src={require("../assets/images/history.svg")} alt="history" />
          </Link>
        </div>
        <div
          className="add-button"
          onClick={e => {
            props.dispatch(addModal(true));
          }}
        >
          <img src={require("../assets/images/add.svg")} alt="add product" />
        </div>
      </div>
    </div>
  );
};

const MapStateToProps = ({ product }) => {
  return product;
};

export default connect(MapStateToProps)(TrainMenu);
