const initialValue = {
  checkDetail: [],
  ordDetail: [],
  checkoutModalValue: false,
  invoice: ""
};

const checkoutReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "DETAIL_CHECKOUT_FULFILLED":
      return {
        ...state,
        checkDetail: action.payload.data.result[0]
      };
    case "DETAIL_ORDERS_FULFILLED":
      return {
        ...state,
        ordDetail: action.payload.data.result
      };
    case "CHECKOUT_MODAL":
      return {
        ...state,
        checkoutModalValue: action.payload
      };
    case "GET_INVOICE":
      return {
        ...state,
        invoice: action.payload
      };
    default:
      return state;
  }
};

export default checkoutReducer;
