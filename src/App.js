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
  handleSubmitOrder = async invoice => {
    this.setState({ loadingSubmitOrder: true });
    this.setState({ invoice });
    let totalPrice = 0;
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    };
    this.state.cart.map(async value => {
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
        .then(res => {
          console.log("berhasil order");
        })
        .catch(err => console.log(err));
    });
    const dataCheckout = {
      invoice,
      total: totalPrice
    };
    await axios
      .post(URL_STRING + "checkout/", dataCheckout, config)
      .then(res => {
        console.log("berhasil order");
      })
      .catch(err => console.log(err));

    await axios
      .get(URL_STRING + "checkout/" + invoice, config)
      .then(res => {
        const detailCheckout = res.data.result[0];
        this.setState({ detailCheckout });
      })
      .catch(err => console.log(err));

    await axios
      .get(URL_STRING + "order/invoice/" + invoice, config)
      .then(res => {
        const detailOrders = res.data.result;
        this.setState({ detailOrders });
      })
      .catch(err => console.log(err));
    this.setState({ cart: [] });
    this.setState({ showCheckout: !this.state.showCheckout });
    this.state.cart.map(async value => {
      localStorage.removeItem(value.id);
    });
    this.setState({ loadingSubmitOrder: false });
  };

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
