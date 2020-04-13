const initialValue = {
  baskets: [],
  basketIDs: []
};

const cartReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let basket = [...state.baskets];
      let basketID = [...state.basketIDs];

      if (state.baskets.length === 0) {
        basket.push(action.payload);
        basketID.push(action.payload.id);
      } else {
        if (!state.baskets.includes(action.payload)) {
          basket.push(action.payload);
          basketID.push(action.payload.id);
        }
      }

      return {
        ...state,
        baskets: basket,
        basketIDs: basketID
      };
    case "REMOVE_ITEM":
      let basketRemove = [...state.baskets];
      let basketIDRemove = [...state.basketIDs];
      basketRemove = basketRemove.filter(value => value.id !== action.payload);
      basketIDRemove = basketIDRemove.filter(value => value !== action.payload);
      return {
        ...state,
        baskets: basketRemove,
        basketIDs: basketIDRemove
      };
    case "REMOVE_CART":
      let basketCancel = [...state.baskets];
      let basketCancelID = [...state.basketIDs];
      basketCancel = [];
      basketCancelID = [];
      return {
        ...state,
        baskets: basketCancel,
        basketIDs: basketCancelID
      };
    default:
      return state;
  }
};

export default cartReducer;
