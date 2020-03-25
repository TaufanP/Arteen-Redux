import React, { Component } from "react";
import '../assets/css/navbar.css';

class CartHeader extends Component{
    render(){
        return(
            <div className="cart-header">
              <span className="cart-title">Cart</span>
              <span className="cart-count">
                {this.props.cart.length === 0 ? 0 : this.props.cart.length}
              </span>
            </div>
        )
    }
}

export default CartHeader;