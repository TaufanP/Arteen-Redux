import React, { Component } from "react";
import "../assets/css/navbar.css";
import { connect } from "react-redux";
import { getSearchProduct, getAllProduct } from "../redux/actions/product";

class SearchBarNav extends Component {
  state = {
    keyword: ""
  };

  getSearch = e => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        this.props.dispatch(getSearchProduct(e.target.value));
      } else {
        this.props.dispatch(getAllProduct());
      }
    }
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          onKeyPress={this.getSearch}
          placeholder="Search something"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ product }) => {
  return {
    product
  };
};

export default connect(mapStateToProps)(SearchBarNav);
