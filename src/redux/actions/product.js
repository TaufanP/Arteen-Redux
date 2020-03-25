import axios from "axios";
import { GET_PRODUCT } from "./actionType";
import { URL_ADDRESS } from "../../env";

const URL_STRING = URL_ADDRESS;
const config = {
  headers: {
    "x-access-token": localStorage.getItem("token")
  }
};

export const getAllProduct = () => {
  return {
    type: GET_PRODUCT,
    payload: axios.get(URL_STRING + "product/", config)
  };
};
