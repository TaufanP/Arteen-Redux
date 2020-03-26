const initialValue = {
  productData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  showModal: false,
  showModalUpdate: false,
  updateID: 0
};

const productReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_PRODUCT_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: action.payload.data.result
      };
    case "GET_SEARCH_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_SEARCH_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_SEARCH_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: action.payload.data.result
      };
    case "ADD_MODAL":
      return {
        ...state,
        showModal: action.payload
      };
    case "UPDATE_MODAL":
      return {
        ...state,
        showModalUpdate: action.payload
      };
    case "GET_UPDATE_ID":
      return {
        ...state,
        updateID: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;
