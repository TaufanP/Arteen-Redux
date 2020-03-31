import React, { useState } from "react";
import "../assets/css/formUpdate.css";
import axios from "axios";
import { connect } from "react-redux";
import { updateModal, getAllProduct } from "../redux/actions/product.js";
import { URL_ADDRESS } from "../env";

const URL_STRING = URL_ADDRESS;

const FormUpdate = props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [id_category, setId_category] = useState(0);

  const handleUpdate = async (id, e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);
    formData.append("id_category", id_category);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-access-token": localStorage.getItem("token")
      }
    };

    await axios
      .patch(URL_STRING + "product/" + id, formData, config)
      .then(res => props.dispatch(updateModal(false)));
    // .catch(err => console.log("gagal masuk"));
    props.dispatch(getAllProduct());
  };

  let modal = "form-update-";
  modal += props.product.showModalUpdate === true ? "show" : "hide";
  return (
    <div className={modal}>
      <h3 className="form-title">Update Item</h3>
      <form>
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td className="input-field">
                <input
                  className="input-product"
                  type="text"
                  name="name"
                  onChange={event => setName(event.target.value)}
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
                  onChange={event => setDescription(event.target.value)}
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
                  onChange={event => setPrice(event.target.value)}
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
                  onChange={event => setStock(event.target.value)}
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
                  onChange={event => setImage(event.target.files[0])}
                />
              </td>
            </tr>
            <tr>
              <td>Category: </td>
              <td className="input-field">
                <select
                  name="id_category"
                  onChange={event => setId_category(event.target.value)}
                >
                  <option value="3">Mainan</option>
                  <option value="1">Makanan</option>
                  <option value="2">Minuman</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className="button-container">
        <div className="close-button-product-update">
          <button
            className="secondary-button-update"
            onClick={() => props.dispatch(updateModal(false))}
            style={{ marginLeft: -24 }}
          >
            CANCEL
          </button>
        </div>
        <div className="add-button-product">
          <button onClick={event => handleUpdate(props.product.updateID, event)} className="primary-button">
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

const MapStateToProps = ({ product }) => {
  return { product };
};

export default connect(MapStateToProps)(FormUpdate);
