import React, { Component } from "react";
import "../assets/css/products.css";
import ListProduct from "./listProduct";
import { connect } from "react-redux";
import { getAllProduct } from "../redux/actions/product";

class Products extends Component {
  state = {
    productData: []
  };

  getUser = async () => {
    await this.props.dispatch(getAllProduct());
    this.setState({
      productData: this.props.product.productData
    });
  };

  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <div className="product-container">
        {this.state.productData.map(product => (
          <ListProduct
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            showModalUpdate={this.props.showModalUpdate}
            handleDelete={this.props.handleDelete}
            handleEdit={this.props.handleEdit}
            handleCart={this.props.handleCart}
            selected={this.props.selected}
            selectedValue={this.props.selectedValue}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({product}) => {
  return{
    product
  }
}

export default connect(mapStateToProps)(Products);
