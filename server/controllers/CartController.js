const { CartSchema, CartItemSchema } = require('../models/CartModel');

const AddToCart = async (req, res) => {
    try {
        let { UserID, ID, Price, Discount, Quantity } = req.body;
        let Cart = await CartSchema.findOne({ UserID });
        if (!Cart) {
            Cart = new CartSchema({ UserID, CartItems: [], Total: 0, Discount: 0 });
        }

        if (Discount != 0) {
            Discount = (Price / 100) * Discount;
            Price = (Price - Discount)
        }

        const CartItem = new CartItemSchema({
            ProductID: ID,
            Price,
            Quantity,
        });
        await CartItem.save();

        Cart.CartItems.push(CartItem._id);

        let ItemsInCart = await CartSchema.findOne({ UserID }).populate({
            path: 'CartItems',
            populate:{
                path: 'ProductID',
                model: "Product"
            }
        });
        console.log(ItemsInCart);
        
        Cart.Total += Price * Quantity;
        Cart.Discount += Discount;

        await Cart.save();
        res.status(201);
    } catch (Error) {
        console.error(Error);
        res.status(500);
    }
};

module.exports = { AddToCart };