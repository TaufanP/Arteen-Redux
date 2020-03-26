import React from "react";
import "../assets/css/navbar.css";
import { connect } from "react-redux";
import { getSearchProduct, getAllProduct } from "../redux/actions/product";

const SearchBarNav = (props) => {
  const getSearch = e => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        return props.dispatch(getSearchProduct(e.target.value));
      } else {
        return props.dispatch(getAllProduct());
      }
    }
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        onKeyPress={getSearch}
        placeholder="Search something"
      />
    </div>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    product
  };
};

export default connect(mapStateToProps)(SearchBarNav);
