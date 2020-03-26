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
let cartId = [];
let cart = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      name: "",
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

  handleCart = product => {
    if (cartId.length === 0) {
      cartId.push(product);
      this.state.products.map(value => {
        if (value.id === product) cart.push(value);
        return console.log("tes");
      });
    } else {
      if (!cartId.includes(product)) {
        cartId.push(product);
        this.state.products.map(value => {
          if (value.id === product) cart.push(value);
          return console.log("tes");
        });
      }
    }
    this.setState({ cart });
  };

  handleCartRemove = product => {
    cartId = cartId.filter(i => i !== product);
    cart = cart.filter(i => i.id !== product);
    this.setState({ cart });
  };

  handleCartCancel = () => {
    cartId = [];
    cart = [];
    this.setState({ cart });
  };

  handleTotalPrice = () => {
    let totalPrice = 0;
    this.state.cart.map(async value => {
      const quantity = localStorage.getItem(value.id);
      totalPrice = totalPrice + quantity * value.price;
    });
    this.setState({ totalPrice });
  };

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
    cart = [];
    cartId = [];
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
        <Products handleCart={this.handleCart} />
        <Cart
          cart={this.state.cart}
          handleCartRemove={this.handleCartRemove}
          handleSubmitOrder={this.handleSubmitOrder}
          handleTotalPrice={this.handleTotalPrice}
          totalPrice={this.state.totalPrice}
          handleCartCancel={this.handleCartCancel}
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
