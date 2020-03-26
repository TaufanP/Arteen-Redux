import React from "react";
import "../assets/css/listProducts.css";
import { connect } from "react-redux";
import {
  getAllProduct,
  deleteProduct,
  updateModal,
  getUpdateID
} from "../redux/actions/product";

const ListProduct = props => {
  const handleDelete = async id => {
    await props.dispatch(deleteProduct(id)).then(() => {
      props.dispatch(getAllProduct());
    });
  };

  const handleEdit = id => {
    props.dispatch(updateModal(true));
    props.dispatch(getUpdateID(id));
  };

  return (
    <div className="item-container">
      <div className="item-image">
        <img src={props.image} alt={props.name} />
      </div>
      <div
        className="distractor"
        onClick={() => props.handleCart(props.id)}
      ></div>
      <div className="option-container">
        <div className="slider">
          <button
            className="delete-item"
            onClick={() => {
              handleDelete(props.id);
            }}
          >
            DELETE
          </button>
          <button className="edit-item" onClick={() => handleEdit(props.id)}>
            EDIT
          </button>
        </div>
        <div className="product-name">{props.name}</div>
        <div className="product-price">Rp. {props.price}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ product }) => {
  return product;
};

export default connect(mapStateToProps)(ListProduct);
