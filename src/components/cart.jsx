import React, { Component } from "react";
import "../assets/css/cart.css";
import CartDetail from "./cartDetail";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [this.props.cart.baskets]
    };
  }
  render() {
    console.log(this.props.cart.baskets);
    const date = new Date();
    const fullYear = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    const lastID = hours.toString() + minutes.toString() + seconds.toString();
    const invoice = day + month + fullYear + lastID;
    let modal = "button-checkout-";
    modal += this.props.cart.length !== 0 ? "show" : "hide";
    let total = "total-price-";
    total += this.props.cart.length !== 0 ? "show" : "hide";
    return (
      <div className="cart-container">
        {this.props.cart.baskets.length === 0 ? (
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
          this.props.cart.baskets.map(value => (
            <CartDetail
              key={value.id}
              cart={value}
              handleCartRemove={this.props.handleCartRemove}
              handleTotalPrice={this.props.handleTotalPrice}
            />
          ))
        )}
        <div className={total}></div>
        {this.props.cart.baskets.length !== 0 && (
          <>
            <div
              className={modal}
              onClick={() => this.props.handleSubmitOrder(invoice)}
            >
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
              onClick={() => this.props.handleCartCancel()}
            >
              CANCEL
            </div>
          </>
        )}
      </div>
    );
  }
}

const MapStateToProps = ({ cart }) => {
  return {
    cart
  };
};

export default connect(MapStateToProps)(Cart);
