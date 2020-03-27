import { combineReducers } from "redux";
import productReducer from "./product";
import cartReducer from "./cart";
import checkoutReducer from "./checkout";

const reducers = combineReducers({
  product: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer
});

export default reducers;
