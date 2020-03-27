import { DETAIL_CHECKOUT, DETAIL_ORDERS, CHECKOUT_MODAL, GET_INVOICE } from "./actionType";
import axios from "axios";
import { URL_ADDRESS } from "../../env";

const URL_STRING = URL_ADDRESS;

export const detailCheckout = invoice => {
  return {
    type: DETAIL_CHECKOUT,
    payload: axios.get(URL_STRING + "checkout/" + invoice, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
  };
};

export const detailOrders = invoice => {
  return {
    type: DETAIL_ORDERS,
    payload: axios.get(URL_STRING + "order/invoice/" + invoice, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
  };
};

export const checkoutModal = bool =>{
  return{
    type: CHECKOUT_MODAL,
    payload: bool
  }
}

export const getInvoice = invoice =>{
  return{
    type: GET_INVOICE,
    payload: invoice
  }
}