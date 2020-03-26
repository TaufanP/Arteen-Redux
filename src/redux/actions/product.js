import axios from "axios";
import { GET_PRODUCT, GET_SEARCH, DELETE_PRODUCT, ADD_MODAL, UPDATE_MODAL, GET_UPDATE_ID } from "./actionType";
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

export const deleteProduct = (id) => {
  return {
    type: DELETE_PRODUCT,
    payload: axios.delete(URL_STRING + "product/" + id,{
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
  };
};

export const addModal = (bool) =>{
  return{
    type: ADD_MODAL,
    payload: bool
  }
}

export const updateModal = (bool) =>{
  return{
    type: UPDATE_MODAL,
    payload: bool
  }
}

export const getUpdateID = id =>{
  return{
    type: GET_UPDATE_ID,
    payload: id
  }
}