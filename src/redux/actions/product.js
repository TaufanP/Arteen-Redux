import axios from "axios";
import { GET_PRODUCT, GET_SEARCH } from "./actionType";
import { URL_ADDRESS } from "../../env";

const URL_STRING = URL_ADDRESS;

export const getAllProduct = () => {
  return {
    type: GET_PRODUCT,
    payload: axios.get(URL_STRING + "product/",{
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
  };
};

export const getSearchProduct = (keyword) => {
  return {
    type: GET_SEARCH,
    payload: axios.get(URL_STRING + "product/search/" + keyword,{
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
  };
};