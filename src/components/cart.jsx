import React from "react";
import "../assets/css/cart.css";
import CartDetail from "./cartDetail";
import { connect } from "react-redux";
import { removeCart } from "../redux/actions/cart";
import {
  detailOrders,
  detailCheckout,
  checkoutModal,
  getInvoice
} from "../redux/actions/checkout";
import axios from "axios";
import { URL_ADDRESS } from "../env.js";

const URL_STRING = URL_ADDRESS;

const Cart = props => {
  const date = new Date();
  const fullYear = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const lastID = hours.toString() + minutes.toString() + seconds.toString();
  const invoice = day + month + fullYear + lastID;
  let modal = "button-checkout-";
  modal += props.cart.length !== 0 ? "show" : "hide";
  let total = "total-price-";
  total += props.cart.length !== 0 ? "show" : "hide";

  const handleSubmitOrder = async invoice => {
    props.dispatch(checkoutModal(true));
    let totalPrice = 0;
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    };
    props.cart.baskets.map(async value => {
      const quantity = localStorage.getItem(value.id);
      totalPrice = totalPrice + quantity * value.price;
      const data = {
        id_product: value.id,
        quantity: quantity,
        total_price: quantity * value.price,
        invoice
      };

      await axios
        .post(URL_STRING + "order/", data, config)
        // .then(res => {
        //   console.log("berhasil order");
        // })
        // .catch(err => console.log(err));
    });
    const dataCheckout = {
      invoice,
      total: totalPrice
    };
    await axios
      .post(URL_STRING + "checkout/", dataCheckout, config)
      // .then(res => {
      //   console.log("berhasil order");
      // })
      // .catch(err => console.log(err));

    props.dispatch(detailCheckout(invoice));
    props.dispatch(detailOrders(invoice));

    props.dispatch(removeCart());
    props.cart.baskets.map(async value => {
      localStorage.removeItem(value.id);
    });
    props.dispatch(getInvoice(invoice));
  };

  return (
    <div className="cart-container">
      {props.cart.baskets.length === 0 ? (
        <div className="empty-cart">
          <img
            src={require("../assets/images/empty-cart.svg")}
            alt="empty cart"
          />
          <span className="empty-cart-title">Your cart is empty</span>
          <span className="empty-cart-sub">
            Please add some items from the menu
          </span>
        </div>
      ) : (
        props.cart.baskets.map(value => (
          <CartDetail
            key={value.id}
            cart={value}
            handleCartRemove={props.handleCartRemove}
            handleTotalPrice={props.handleTotalPrice}
          />
        ))
      )}
      <div className={total}></div>
      {props.cart.baskets.length !== 0 && (
        <>
          <div className={modal} onClick={() => handleSubmitOrder(invoice)}>
            CHECKOUT
          </div>
          <div
            className={modal}
            style={{
              backgroundColor: "rgb(222, 83, 83)",
              borderColor: "rgb(222, 83, 83)",
              borderWidth: 1,
              marginTop: 16
            }}
            onClick={() => props.dispatch(removeCart())}
          >
            CANCEL
          </div>
        </>
      )}
    </div>
  );
};

const MapStateToProps = ({ cart }) => {
  return {
    cart
  };
};

export default connect(MapStateToProps)(Cart);
