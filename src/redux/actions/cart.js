import { ADD_TO_CART, REMOVE_ITEM, REMOVE_CART} from "./actionType";

export const addToCart = data => {
  return {
    type: ADD_TO_CART,
    payload: data
  };
};

export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    payload: id
  };
};

export const removeCart = () => {
  return {
    type: REMOVE_CART
  };
};

