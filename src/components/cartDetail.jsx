import React, { Component } from "react";
import "../assets/css/cartDetail.css";

class CartDetail extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1
    };
  }

  addItem = add => {
    if (this.state.counter < this.props.cart.stock)
      this.setState({ counter: this.state.counter + add });
    this.props.handleTotalPrice();
  };
  delItem = del => {
    if (this.state.counter > 1) {
      this.setState({ counter: this.state.counter - del });
    } else {
      this.props.handleCartRemove(this.props.cart.id);
      localStorage.removeItem(this.props.cart.id);
    }
  };

  componentDidUpdate() {
    localStorage.setItem(this.props.cart.id, this.state.counter);
  }

  render() {
    const { counter } = this.state;
    const { image, name, price } = this.props.cart;
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
              <button onClick={() => this.delItem(1)}>-</button>
              <span className="counter-number">{counter}</span>
              <button onClick={() => this.addItem(1)}>+</button>
            </div>
          </div>
        </div>
        <div className="detail-price">
          <span className="price-cart">Rp. {counter * price}</span>
        </div>
      </div>
    );
  }
}

export default CartDetail;
