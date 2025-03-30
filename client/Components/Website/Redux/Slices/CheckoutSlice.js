const { createSlice } = require("@reduxjs/toolkit");

const CheckoutSlice = createSlice({
    name: "Checkout",
    initialState: {
        PaymentMethod: null,
        AddressID: null,
        CartItems: [],
        OriginalTotal: 0,
        DiscountedTotal: 0,
        Pickup: [],
    },
    reducers: {
        UpdatePaymentMethod: (state, action) => {
            state.PaymentMethod = action.payload.PaymentMethod;
        },
        UpdateAddressID: (state, action) => {
            state.AddressID = action.payload.AddressID;
        },
        ClearCheckoutState: (state) => {
            state.AddressID = null;
            state.PaymentMethod = null;
        },
        Converted: (state, action) => {
            // This will just copy the data that was passed from the thunk
            const { CartItems, OriginalTotal, DiscountedTotal, Pickup } = action.payload;
            state.CartItems = CartItems;
            state.OriginalTotal = OriginalTotal;
            state.DiscountedTotal = DiscountedTotal;
            state.Pickup = Pickup;
          },
    }
})

export const convertCartToCheckout = () => (dispatch, getState) => {
    const cartState = getState().Cart;
  
    // Dispatch the Converted action with the CartSlice data
    dispatch(
      CheckoutSlice.actions.Converted({
        CartItems: cartState.CartItems,
        OriginalTotal: cartState.OriginalTotal,
        DiscountedTotal: cartState.DiscountedTotal,
        Pickup: cartState.Pickup,
      })
    );
  };

export const { UpdatePaymentMethod, UpdateAddressID, ClearCheckoutState, Converted } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;