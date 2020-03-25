import React, { Component } from "react";
import "../assets/css/formProduct.css";

class FormProduct extends Component {
  render() {
    let modal = "form-";
    modal += this.props.productsAll.show === true ? "show" : "hide";
    return (
      <div className={modal}>
        <h3 className="form-title">Add Item</h3>
        <form onSubmit={this.props.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Name: </td>
                <td className="input-field">
                  <input
                    className="input-product"
                    type="text"
                    name="name"
                    onChange={this.props.handleChange}
                    defaultValue={this.props.productsAll.edit[0].name}
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
                    onChange={this.props.handleChange}
                    defaultValue={this.props.productsAll.edit[0].description}
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
                    onChange={this.props.handleChange}
                    defaultValue={this.props.productsAll.edit[0].price}
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
                    onChange={this.props.handleChange}
                    defaultValue={this.props.productsAll.edit[0].stock}
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
                    onChange={this.props.handleChangeImage}
                  />
                </td>
              </tr>
              <tr>
                <td>Category: </td>
                <td className="input-field">
                  <select name="id_category" onChange={this.props.handleChange}>
                    <option value="3">Mainan</option>
                    <option value="1">Makanan</option>
                    <option value="2">Minuman</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <div className="close-button-product">
              <button
                className="secondary-button"
                onClick={this.props.hideModal}
              >
                CANCEL
              </button>
            </div>
            <div className="add-button-product">
              <button type="submit" className="primary-button">
                ADD
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormProduct;
