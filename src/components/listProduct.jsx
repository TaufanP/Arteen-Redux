import React from "react";
import "../assets/css/listProducts.css";
import { connect } from "react-redux";
import {
  getAllProduct,
  deleteProduct,
  updateModal,
  getUpdateID,
} from "../redux/actions/product";

import { addToCart } from "../redux/actions/cart";

const ListProduct = (props) => {
  const handleDelete = async (id) => {
    await props.dispatch(deleteProduct(id)).then(() => {
      props.dispatch(getAllProduct());
    });
  };

  const handleEdit = (id) => {
    props.dispatch(updateModal(true));
    props.dispatch(getUpdateID(id));
  };

  const dataProduct = {
    id: props.id,
    name: props.name,
    price: props.price,
    image: props.image,
    stock: props.stock,
  };

  const handleCart = (data) => {
    props.dispatch(addToCart(data));
  };

  return (
    <div className="item-container">
      <div
        className={
          props.keranjang.indexOf(props.id) !== -1
            ? "item-image-selected"
            : "item-image"
        }
        onClick={
          props.keranjang.indexOf(props.id) === -1 ? () => handleCart(dataProduct) : ()=> null
        }
      >
        <img src={props.image} alt={props.name} />
      </div>
      <div className="misc-container">
        <div className="name-price-container">
          <div className="product-name">{props.name}</div>
          <div className="product-price">Rp. {props.price}</div>
        </div>
        <div className="options-container">
          <div className="edit-option" onClick={() => handleEdit(props.id)}>
            <img
              src={require("../assets/images/pencil.svg")}
              alt="icon"
              style={{
                width: 28,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 6,
              }}
            />
          </div>
          <div
            className="delete-option"
            onClick={() => {
              handleDelete(props.id);
            }}
          >
            <img
              src={require("../assets/images/ic_delete_48px.svg")}
              alt="icon"
              style={{
                width: 32,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 4,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ product }) => {
  return product;
};

export default connect(mapStateToProps)(ListProduct);
