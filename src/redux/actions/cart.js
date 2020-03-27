import { ADD_TO_CART, REMOVE_ITEM} from "./actionType";

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

