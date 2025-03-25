const { createSlice } = require("@reduxjs/toolkit");

const CheckoutSlice = createSlice({
    name: "Checkout",
    initialState: {
        PaymentMethod: null,
        AddressID: null,
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
        }
    }
})
export const { UpdatePaymentMethod, UpdateAddressID, ClearCheckoutState } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;