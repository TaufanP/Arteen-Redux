import React, { Component } from "react";
import "../assets/css/formUpdate.css";
import axios from "axios";
import { connect } from "react-redux";
import { updateModal, getAllProduct } from "../redux/actions/product.js";
import { URL_ADDRESS } from "../env";

const URL_STRING = URL_ADDRESS;

class FormUpdate extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
    id_category: 0
  };
  handleUpdate = async id => {
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
      .then(res => this.props.dispatch(updateModal(false)))
      .catch(err => console.log("gagal masuk"));
    this.props.dispatch(getAllProduct());
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  render() {
    const { name, price, stock, description } = this.state;
    let modal = "form-update-";
    modal += this.props.product.showModalUpdate === true ? "show" : "hide";
    return (
      <div className={modal}>
        <h3 className="form-title">Update Item</h3>
        <form onSubmit={()=>this.handleUpdate(this.props.product.updateID)}>
          <table>
            <tbody>
              <tr>
                <td>Name: </td>
                <td className="input-field">
                  <input
                    className="input-product"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    defaultValue={name}
                  />
                </td>
              </tr>
              <tr>
                <td>Description: </td>
                <td className="input-field">
                  <textarea
                    className="input-product"
                    type="text"
                    name="description"
                    onChange={this.handleChange}
                    defaultValue={description}
                  />
                </td>
              </tr>
              <tr>
                <td>Price: </td>
                <td className="input-field">
                  <input
                    className="input-product"
                    type="text"
                    name="price"
                    onChange={this.handleChange}
                    defaultValue={price}
                  />
                </td>
              </tr>
              <tr>
                <td>Stock: </td>
                <td className="input-field">
                  <input
                    className="input-product"
                    type="text"
                    name="stock"
                    onChange={this.handleChange}
                    defaultValue={stock}
                  />
                </td>
              </tr>
              <tr>
                <td>Image: </td>
                <td>
                  <input
                    className="input-image"
                    type="file"
                    name="image"
                    onChange={this.handleChangeImage}
                  />
                </td>
              </tr>
              <tr>
                <td>Category: </td>
                <td className="input-field">
                  <select name="id_category" onChange={this.handleChange}>
                    <option value="3">Mainan</option>
                    <option value="1">Makanan</option>
                    <option value="2">Minuman</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="add-button-product">
            <button type="submit" className="primary-button">
              UPDATE
            </button>
          </div>
          <div className="close-button-product-update">
            <button
              className="secondary-button-update"
              onClick={() => this.props.dispatch(updateModal(false))}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const MapStateToProps = ({ product }) => {
  return {
    product
  };
};

export default connect(MapStateToProps)(FormUpdate);
