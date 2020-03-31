import React, {useState, useEffect} from "react";
import "../assets/css/navbar.css";
import { connect } from "react-redux";
import { getSearchProduct, getAllProduct, sortProduct } from "../redux/actions/product";

const SearchBarNav = props => {
  const [sort, setSort] = useState(3)
  const getSearch = e => {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        return props.dispatch(getSearchProduct(e.target.value));
      } else {
        return props.dispatch(getAllProduct());
      }
    }
  };
  useEffect(()=>{
    props.dispatch(sortProduct(sort))
  }, [sort])
  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          type="text"
          onKeyPress={getSearch}
          placeholder="Search something"
        />
      </div>
      <div className="select-container">
        <select
          name="id_category"
          onChange={event => setSort(event.target.value)}
          className = 'select-style'
        >
          <option value="3">Sort By</option>
          <option value="A-Z">A-Z</option>
          <option value='Z-A'>Z-A</option>
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = ({ product }) => {
  return {
    product
  };
};

export default connect(mapStateToProps)(SearchBarNav);
