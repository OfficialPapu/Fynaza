const path = require('path');
const { CartSchema } = require('../models/CartModel');
const geoip = require('geoip-lite');
const countries = require('i18n-iso-countries');
const getFormattedPath = (filePath) => {
    const parts = filePath.split(path.sep);
    return `${parts[parts.length - 3]}/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
};

const createSlug = (name) => {
    return name
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};

const CalculateTotalPrice = async (UserID) => {
    let Cart = await CartSchema.findOne({ UserID })
        .populate({
            path: 'CartItems',
            match: { Status: 'Active' },
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

const CountryInfo = (ip) => {
    const geo = geoip.lookup(ip);
    if (geo) {
        const Country = countries.getName(geo.country, "en") || null;
        const City = geo.city || null;
        return { Country, City };
    } else {
        return { Country: null, City: null };
    }
};


module.exports = { getFormattedPath, createSlug, CalculateTotalPrice, CountryInfo }