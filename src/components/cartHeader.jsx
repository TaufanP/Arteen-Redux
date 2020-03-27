import React, { Component } from "react";
import '../assets/css/navbar.css';
import {connect} from 'react-redux';

const CartHeader = (props) => {
        return(
            <div className="cart-header">
              <span className="cart-title">Cart</span>
              <span className="cart-count">
                {props.cart.baskets.length === 0 ? 0 : props.cart.baskets.length}
              </span>
            </div>
        )
    }

const mapStateToProps = ({cart}) => {
  return{
    cart
  }
}

export default connect (mapStateToProps)(CartHeader);