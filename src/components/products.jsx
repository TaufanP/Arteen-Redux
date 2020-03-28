import React, { useState, useEffect } from "react";
import "../assets/css/products.css";
import ListProduct from "./listProduct";
import { connect } from "react-redux";
import { getAllProduct } from "../redux/actions/product";

const Products = props => {
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    await props.dispatch(getAllProduct());
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="product-container">
      {loading ? (
        <div className="product-loading-container">
          <div className="product-loading">
            <div className = "ball-1"></div>
            <div className = "ball-2"></div>
            <div className = "ball-3"></div>
            <div className = "ball-4"></div>
          </div>
        </div>
      ) : (
        props.product.productData.map(product => (
          <ListProduct
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            stock={product.stock}
            showModalUpdate={props.showModalUpdate}
            handleDelete={props.handleDelete}
            handleEdit={props.handleEdit}
            handleCart={props.handleCart}
            selected={props.selected}
            selectedValue={props.selectedValue}
          />
        ))
      )}
    </div>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    product
  };
};

export default connect(mapStateToProps)(Products);
