const initialValue = {
  baskets: []
};

const cartReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let basket = [...state.baskets];

      if (state.baskets.length === 0) {
        basket.push(action.payload);
      } else {
        if (!state.baskets.includes(action.payload)) {
          basket.push(action.payload);
        }
      }

      return {
        ...state,
        baskets: basket
      };
    case "REMOVE_ITEM":
      let basketRemove = [...state.baskets];
      basketRemove = basketRemove.filter(value => value.id !== action.payload);
      return {
        ...state,
        baskets: basketRemove
      };
      case "REMOVE_CART":
        let basketCancel = [...state.baskets];
        basketCancel = []
        return {
          ...state,
          baskets: basketCancel
        };
    default:
      return state;
  }
};

export default cartReducer;
