import React, { Component } from "react";
import "./App.css";
import FormUpdate from "./components/formUpdate";
import FormProduct from "./components/formProduct";
import Cart from "./components/cart";
import TrainMenu from "./components/trainMenu";
import Navbar from "./components/navbar";
import Products from "./components/products";
import CheckoutDetail from './components/checkoutDetail'
import axios from "axios";
import { URL_ADDRESS } from "./env";
import {connect} from 'react-redux';

const URL_STRING = URL_ADDRESS;
let cartId = [];
let cart = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      edit: [
        {
          name: "",
          description: "",
          price: "",
          stock: "",
          image: null,
          id_category: 0
        }
      ],
      cart: [],
      cartFull: [],
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: null,
      id_category: 0,
      idDelete: 0,
      idEdit: 0,
      sort: "",
      show: false,
      showUpdate: false,
      totalPrice: 0,
      detailCheckout: [],
      detailOrders: [],
      showCheckout: false,
      invoice: '',
      loadingSubmitOrder: false,
    };
  }

  // MISC
  //======================================================================================================================================
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showCheckoutModal = () => {
    this.setState({ showCheckout: !this.state.showCheckout });
  };

  showModalUpdate = () => {
    this.setState({ showUpdate: true });
  };

  hideModalUpdate = () => {
    this.setState({ showUpdate: false });
  };

  // ACTION
  //======================================================================================================================================

  // getProduct() {
  //   axios
  //     .get(URL_STRING + "product", {
  //       headers: { "x-access-token": localStorage.getItem("token") }
  //     })
  //     .then(res => {
  //       const data = res.data.result;
  //       this.setState({ products: data });
  //     })
  //     .catch(err => console.log(err));
  // }

  getProductSearch = search => {
    if (search === "") {
      this.getProduct();
    } else {
      axios
        .get(URL_STRING + "product/search/" + search, {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(res => {
          const data = res.data.result;
          this.setState({ products: data });
          console.log(search);
        })
        .catch(err => console.log(err));
    }
  };

  getProductSort = sort => {
    if (sort === "none") {
      this.getProduct();
    } else {
      axios
        .get(URL_STRING + "product/sort/" + sort, {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(res => {
          const data = res.data.result;
          this.setState({ products: data });
          console.log(sort);
        })
        .catch(err => console.log(err));
    }
  };

  getProductDetail = id => {
    axios
      .get(URL_STRING + "product/" + id, {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(res => {
        const data = res.data.result[0];
        this.setState({ cartFull: data });
        console.log(this.state.cartFull);
      })
      .catch(err => console.log(err));
  };

  // Handle
  //======================================================================================================================================

  handleCart = product => {
    if (cartId.length === 0) {
      cartId.push(product);
      this.state.products.map(value => {
        if (value.id === product) cart.push(value);
        return console.log('tes')
      });
    } else {
      if (!cartId.includes(product)) {
        cartId.push(product);
        this.state.products.map(value => {
          if (value.id === product) cart.push(value);
          return console.log('tes')
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
    cartId = []
    cart = []
    this.setState({ cart });
  };

  handleDelete = id => {
    axios.delete(URL_STRING + "product/" + id, {
      headers: { "x-access-token": localStorage.getItem("token") }
    });
    this.getProduct();
  };

  handleEdit = id => {
    axios
      .get(URL_STRING + "product/" + id, {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(res => {
        const data = res.data.result;
        this.setState({ edit: data });
      })
      .catch(err => console.log(err));
  };

  handleUpdate = async id => {
    console.log(id);
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("stock", this.state.stock);
    formData.append("image", this.state.image);
    formData.append("id_category", this.state.id_category);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": localStorage.getItem("token")
      }
    };

    await axios
      .patch(URL_STRING + "product/" + id, formData, config)
      .then(res => this.setState({ showUpdate: false }))
      .catch(err => console.log("gagal masuk"));
    this.getProduct();
  };

  handleSubmit = async e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("stock", this.state.stock);
    formData.append("image", this.state.image);
    formData.append("id_category", this.state.id_category);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.getItem("token")
      }
    };

    await axios
      .post(URL_STRING + "product/", formData, config)
      .then(res => {
        console.log("berhasil masuk");
        this.setState({ show: false });
      })
      .catch(err => console.log("gagal masuk"));

    this.getProduct();
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
    this.setState({loadingSubmitOrder: true})
    this.setState({invoice})
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
        this.setState({detailCheckout})
      })
      .catch(err => console.log(err));

    await axios
      .get(URL_STRING + "order/invoice/" + invoice, config)
      .then(res => {
        const detailOrders = res.data.result;
        this.setState({detailOrders})
      })
      .catch(err => console.log(err));
    cart = [];
    cartId = [];
    this.setState({ cart: [] });
    this.setState({ showCheckout: !this.state.showCheckout });
    this.state.cart.map(async value => {localStorage.removeItem(value.id);})
    this.setState({loadingSubmitOrder: false})
  };

  handleSearch = e => {
    e.preventDefault();
    this.setState({ search: e.target.value }, () =>
      this.getProductSearch(this.state.search)
    );
    // if(e.key === "Enter"){
    //   e.preventDefault();
    //   this.setState(
    //     {search: e.target.value},
    //     () => this.getProductSearch(this.state.search)
    //   )
    // }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleLogout = () => {
    localStorage.removeItem('token')
    this.props.history.push("/");
  }
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
        <Navbar handleSearch={this.handleSearch} cart={this.state.cart} handleLogout= {this.handleLogout}/>
        <TrainMenu showModal={this.showModal} />
        <Products
          handleCart={this.handleCart}
          handleDelete={this.handleDelete}
          showModalUpdate={this.showModalUpdate}
          products={this.state.products}
          handleEdit={this.handleEdit}
        />
        <Cart
          cart={this.state.cart}
          products={this.state.products}
          handleCartRemove={this.handleCartRemove}
          handleSubmitOrder={this.handleSubmitOrder}
          handleTotalPrice={this.handleTotalPrice}
          totalPrice={this.state.totalPrice}
          handleCartCancel={this.handleCartCancel}
          loadingSubmitOrder = {this.loadingSubmitOrder}
        />
        <FormProduct
          showModal={this.showModal}
          hideModal={this.hideModal}
          productsAll={this.state}
          handleChangeImage={this.handleChangeImage}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <FormUpdate
          hideModalUpdate={this.hideModalUpdate}
          productsAll={this.state}
          handleChangeImage={this.handleChangeImage}
          handleChange={this.handleChange}
          handleUpdate={this.handleUpdate}
        />
        <CheckoutDetail
          invoice = {this.state.invoice}
          showCheckoutModal={this.showCheckoutModal}
          checkoutModal = {this.state.showCheckout}
          detailCheckout = {this.state.detailCheckout}
          detailOrders = {this.state.detailOrders}
        />
      </div>
    );
  }
}
const mapStateToProps = (product) => {
  return{
    product
  }
}
export default connect(mapStateToProps)(App);
