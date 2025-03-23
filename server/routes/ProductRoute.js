const express = require('express');
const ProductRouter = express.Router();
const { GetProductBySlug, AddProduct, TiptapMediaUpload, GetProducts, AddReview, GetReview } = require('../controllers/ProductController');
ProductRouter.get("/:Slug", GetProductBySlug);
ProductRouter.post("/add", AddProduct);
ProductRouter.post("/tiptap/upload", TiptapMediaUpload);

ProductRouter.get("/", GetProducts);
ProductRouter.post("/review/add", AddReview);
ProductRouter.get("/review/:ProductID", GetReview);

module.exports = { ProductRouter };