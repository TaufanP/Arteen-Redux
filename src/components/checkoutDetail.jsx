import React, { Component } from "react";
import "../assets/css/checkoutDetail.css";
import {connect} from 'react-redux';
import {checkoutModal} from '../redux/actions/checkout'

class CheckoutDetail extends Component {
  render() {
    console.log("Checkout: " + this.props.checkout.checkDetail)
    console.log("ORDERS: " + this.props.checkout.ordDetail)
    let modal = "form-";
    modal += this.props.checkout.checkoutModalValue === true ? "show" : "hide";
    return (
      <div className={modal}>
        <div className="header-checkout">
          <div className="header-title">
            <div className="checkout" style={{ paddingTop: 8 }}>
              <span style={{ fontSize: 20, fontWeight: "bold" }}>Checkout</span>
            </div>
            <div className="checkout-cashier">
              <span style={{ fontSize: 12, fontWeight: "bold" }}>
                Cashier: {localStorage.getItem('cashier')}
              </span>
            </div>
          </div>
          <div className="header-receipt">
            <div className="left-receipt">
              <span>Receipt #{this.props.checkout.invoice}</span>
            </div>
          </div>
        </div>
        <div className="items-checkout">
          <table style={{ width: "100%" }}>
            <tbody>
              {this.props.checkout.ordDetail.map(value => {
                return (
                  <tr style={{ padding: 8 }} key = {value.id}>
                    <td style={{ padding: 8 }}>{value.name}</td>
                    <td style={{ textAlign: "right", padding: 8 }}>Rp. {value.total_price}</td>
                  </tr>
                );
              })}
              <tr style={{ padding: 8 }}>
                <td style={{ padding: 8, fontWeight: "bold" }}>Total</td>
                <td
                  style={{ textAlign: "right", padding: 8, fontWeight: "bold" }}
                >
                  Rp. {this.props.checkout.checkDetail.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="buttons-checkout">
          <div className="button-print">PRINT</div>
          <div
            className="button-send-email"
            onClick={() => this.props.dispatch(checkoutModal(false))}
          >
            SEND EMAIL
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({checkout}) => {
  return{
    checkout
  }
}

export default connect (mapStateToProps)(CheckoutDetail);
