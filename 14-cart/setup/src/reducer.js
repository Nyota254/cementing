const reducer = (state, action) => {
  //Filter for removal of item from list
  let newData = state.cart.filter((cartItem) => {
    return cartItem.id !== action.payload;
  });

  //Increase price and amount for one item
  let increasedAmount = state.cart.map((cartItem) => {
    if (cartItem.id === action.payload) {
      return { ...cartItem, amount: cartItem.amount + 1 };
    }
    return cartItem;
  });
  //Decrease price and amount for on item
  let decreasedAmount = state.cart
    .map((cartItem) => {
      if (cartItem.id === action.payload) {
        if (cartItem.amount === 0) {
        }
        return { ...cartItem, amount: cartItem.amount - 1 };
      }
      return cartItem;
    })
    .filter((cartItem) => cartItem.amount !== 0);

  //Switch Case for action taken
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE_ITEM":
      return { ...state, cart: newData };
    case "INCREASE":
      return { ...state, cart: increasedAmount };
    case "DECREASE":
      return { ...state, cart: decreasedAmount };
    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          let { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case "LOADING":
      return { ...state, loading: true };
    case "DISPLAY_ITEMS":
      return { ...state, loading: false, cart: action.payload };
    default:
      return state;
  }
};

export default reducer;
