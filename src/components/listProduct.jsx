import React, { Component } from "react";
import "../assets/css/listProducts.css";
import { connect } from "react-redux";
import { getAllProduct, deleteProduct, updateModal, getUpdateID } from "../redux/actions/product";

class ListProduct extends Component {
  handleDelete = async id => {
    await this.props.dispatch(deleteProduct(id)).then(() => {
      this.props.dispatch(getAllProduct());
    });
  };

  handleEdit = (id) =>{
    this.props.dispatch(updateModal(true))
    this.props.dispatch(getUpdateID(id))
  }

  render() {
    return (
      <div className="item-container">
        <div className="item-image">
          <img src={this.props.image} alt={this.props.name} />
        </div>
        <div
          className="distractor"
          onClick={() => this.props.handleCart(this.props.id)}
        ></div>
        <div className="option-container">
          <div className="slider">
            <button
              className="delete-item"
              onClick={() => {
                this.handleDelete(this.props.id);
              }}
            >
              DELETE
            </button>
            <button className="edit-item" onClick={()=>this.handleEdit(this.props.id)}>
              EDIT
            </button>
          </div>
          <div className="product-name">{this.props.name}</div>
          <div className="product-price">Rp. {this.props.price}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ product }) => {
  return product;
};

export default connect(mapStateToProps)(ListProduct);
