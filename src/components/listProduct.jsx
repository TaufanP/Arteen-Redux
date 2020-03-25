import React, { Component } from "react";
import "../assets/css/listProducts.css";

class ListProduct extends Component {
  render() {
    return (
      <div className="item-container" onClick={() => this.props.selected}>
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
                this.props.handleDelete(this.props.id);
              }}
            >
              DELETE
            </button>
            <button className="edit-item" onClick={this.props.showModalUpdate}>
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

export default ListProduct;
