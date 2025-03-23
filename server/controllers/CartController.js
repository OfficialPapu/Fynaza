const { CartSchema, CartItemSchema } = require('../models/CartModel');
const { ProductSchema } = require('../models/ProductModel');
const CalculateTotalPrice = async (UserID) => {
    let Cart = await CartSchema.findOne({ UserID })
        .populate({
            path: 'CartItems',
            populate: {
                path: 'ProductID',
                model: "Products",
                populate: {
                    path: 'CategoryID',
                    model: 'Categories'
                }
            }
        });

    let ProductTotal = 0;
    let CartTotal = 0;

    Cart.CartItems.forEach(Item => {
        if (Item.ProductID && Item.ProductID.Price) {
            ProductTotal += Item.ProductID.Price * Item.Quantity;
        }
        if (Item.Price) {
            CartTotal += Item.Price * Item.Quantity;
        }
    });
    return { ProductTotal, CartTotal };
};


const AddToCart = async (req, res) => {
    try {
        let { UserID, Product: { ID, Price, Discount, Quantity } } = req.body;
        let Cart = await CartSchema.findOne({ UserID });
        if (!Cart) {
            Cart = new CartSchema({ UserID, CartItems: [], Total: 0, Discount: 0 });
        }

        if (Discount) {
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
        await Cart.save();

        const { ProductTotal, CartTotal } = await CalculateTotalPrice(UserID);
        Discount = ProductTotal - CartTotal;
        await CartSchema.updateOne(
            { UserID },
            { $set: { Total: CartTotal, Discount: Discount } }
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
};

const RemoveFromCart = async (req, res) => {
    try {
        const { CartItemID } = req.params;
        const { UserID } = req.query;
        await CartItemSchema.updateOne(
            { _id: CartItemID },
            { $set: { Status: 'Abandoned' } }
        );
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}

const CartItems = async (req, res) => {
    try {
        const { UserID } = req.params;
        let Cart = await CartSchema.findOne({ UserID });
        if (!Cart) {
            return res.sendStatus(404);
        }
        const CartItems = await CartSchema.findOne({ UserID }).populate({
            path: 'CartItems',
            match: { Status: 'Active' },
            populate: {
                path: 'ProductID',
                model: "Products",
            }
        })
        res.status(200).json(CartItems['CartItems']);
    } catch (error) {
        res.sendStatus(500);
    }
}

const UpdateQuantity = async (req, res) => {
    try {
        const { CartItemID } = req.params;
        const { ProductID, UserID, Quantity } = req.body;
        const Product = await ProductSchema.findOne({ _id: ProductID });
        if (Product.Stock.Quantity < Quantity) {
            return res.sendStatus(450);
        }
        await CartItemSchema.updateOne(
            { _id: CartItemID },
            { $set: { Quantity: parseInt(Quantity) } }
        );
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = { CartItems, AddToCart, RemoveFromCart, UpdateQuantity };