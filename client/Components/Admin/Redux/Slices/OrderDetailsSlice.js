const { createSlice } = require("@reduxjs/toolkit");

const OrderDetailsSlice = createSlice({
    name: "OrderDetails",
    initialState: {
        UpdateStatusDialogOpen: false,
        AddNoteDialogOpen: false,
    },
    reducers: {
        HandelDialogChanges: (state, action) => {
            const { Type } = action.payload;
            Type == "UpdateStatusDialogOpen" ? state.UpdateStatusDialogOpen = !state.UpdateStatusDialogOpen : state.AddNoteDialogOpen = !state.AddNoteDialogOpen
        }
    }
})

export const { HandelDialogChanges } = OrderDetailsSlice.actions;
export default OrderDetailsSlice.reducer;