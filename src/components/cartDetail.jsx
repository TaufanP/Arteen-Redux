import React, { useState, useEffect } from "react";
import "../assets/css/cartDetail.css";
import { connect } from "react-redux";
import { removeItem } from "../redux/actions/cart";

const CartDetail = (props) => {
  const [counter, setCounter] = useState(1);

  const addItem = (add) => {
    if (counter < props.cart.stock) setCounter(counter + add);
    props.cart.count = props.cart.count + add;
  };
  const delItem = (del) => {
    if (counter > 1) {
      setCounter(counter - del);
      props.cart.count = props.cart.count - del;
    } else {
      props.dispatch(removeItem(props.cart.id));
    }
  };

  // useEffect(() => {
  //   localStorage.setItem(props.cart.id, counter); // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(props.cart.id, counter); // eslint-disable-next-line
  // }, [counter]);

  const { image, name, price } = props.cart;
  return (
    <div className="cart-detail-container">
      <div className="detail-image">
        <img src={image} alt={name} />
      </div>
      <div className="detail-name">
        <span className="name-cart">{name}</span>
      </div>
      <div className="detail-counter">
        <div className="counter-container">
          <div className="container-counter">
            <button onClick={() => delItem(1)}>-</button>
            <span className="counter-number">{counter}</span>
            <button onClick={() => addItem(1)}>+</button>
          </div>
        </div>
      </div>
      <div className="detail-price">
        <span className="price-cart">Rp. {counter * price}</span>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart: cartd }) => {
  return {
    cartd,
  };
};

export default connect(mapStateToProps)(CartDetail);
