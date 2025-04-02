const { createSlice } = require("@reduxjs/toolkit");

const OrderDetailsSlice = createSlice({
    name: "OrderDetails",
    initialState: {
        UpdateStatusDialogOpen: false,
        NewStatus: "",
    },
    reducers: {
        HandelDialogChanges: (state) => {
            state.UpdateStatusDialogOpen = !state.UpdateStatusDialogOpen
        },
        HandelStatusChanges: (state, action) => {
            const { status } = action.payload;
            state.NewStatus = status;
        }
    }
})

export const { HandelDialogChanges, HandelStatusChanges } = OrderDetailsSlice.actions;
export default OrderDetailsSlice.reducer;