const { createSlice } = require("@reduxjs/toolkit");
const CalculatePrice = (CartItems) => {
    return CartItems.reduce(
        (Totals, Item) => {
            const Price = Item.PriceAfterDiscount || Item.Price;
            Totals.OriginalTotal += Item.Quantity * Item.Price;
            Totals.DiscountedTotal += Item.Quantity * Price;
            return Totals;
        },
        { OriginalTotal: 0, DiscountedTotal: 0 }
    );
};

const CartSlice = createSlice({
    name: "Cart",
    initialState: {
        CartItems: [],
        OriginalTotal: 0,
        DiscountedTotal: 0,  
    },
    reducers: {
        AddToCart: ((state, action) => {
            const NewItem = action.payload;
            const isExist = state.CartItems.find(Item => Item.ProductID == NewItem.ProductID);
            if (!isExist) {
                state.CartItems.push({
                    ...NewItem,
                    PriceAfterDiscount: ((NewItem.Price - (NewItem.Price / 100) * NewItem.Discount)) < NewItem.Price ? (NewItem.Price - (NewItem.Price / 100) * NewItem.Discount) : null,
                })
            }

            Object.assign(state, CalculatePrice(state.CartItems));
        }),

        UpdateQuantity: (state, action) => {
            const { ProductID, Quantity } = action.payload;
            const Item = state.CartItems.find((item) => item.ProductID == ProductID);
            if (Item) {
                Item.Quantity = Quantity;
                Object.assign(state, CalculatePrice(state.CartItems));
            }
        },

        RemoveFromCart: (state, action) => {
            const { ProductID } = action.payload;
            state.CartItems = state.CartItems.filter((item) => item.ProductID != ProductID);
            Object.assign(state, CalculatePrice(state.CartItems));
        },

    }
})

export const { AddToCart, UpdateQuantity, RemoveFromCart } = CartSlice.actions;
export default CartSlice.reducer;