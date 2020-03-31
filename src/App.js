import React, { Component } from "react";
import "./App.css";
import FormUpdate from "./components/formUpdate";
import FormProduct from "./components/formProduct";
import Cart from "./components/cart";
import TrainMenu from "./components/trainMenu";
import Navbar from "./components/navbar";
import Products from "./components/products";
import CheckoutDetail from "./components/checkoutDetail";
import axios from "axios";
import { URL_ADDRESS } from "./env";
import { connect } from "react-redux";

const URL_STRING = URL_ADDRESS;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      totalPrice: 0,
      detailCheckout: [],
      detailOrders: [],
      showCheckout: false,
      invoice: ""
    };
  }

  // MISC
  //======================================================================================================================================
  showCheckoutModal = () => {
    this.setState({ showCheckout: !this.state.showCheckout });
  };

  // Handle
  //======================================================================================================================================
  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  //======================================================================================================================================
  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      // this.getProduct();
    } else {
      this.props.history.push("/loginwarn");
    }
  }

  render() {
    return (
      <div>
        <Navbar cart={this.state.cart} handleLogout={this.handleLogout} />
        <TrainMenu />
        <Products />
        <Cart
          cart={this.state.cart}
          handleSubmitOrder={this.handleSubmitOrder}
          totalPrice={this.state.totalPrice}
        />
        <FormProduct />
        <FormUpdate />
        <CheckoutDetail
          invoice={this.state.invoice}
          showCheckoutModal={this.showCheckoutModal}
          checkoutModal={this.state.showCheckout}
          detailCheckout={this.state.detailCheckout}
          detailOrders={this.state.detailOrders}
        />
      </div>
    );
  }
}
const mapStateToProps = product => {
  return {
    product
  };
};
export default connect(mapStateToProps)(App);
