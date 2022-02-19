import express from 'express';
import asyncHandler from 'express-async-handler'; 

// Model
import Product from '../models/productModel.js'

// Auth middlewares
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc       Fetch all products
// @route      GET /api/products
// @access     Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}));

// @desc       Fetch a single product
// @route      GET /api/product/:id
// @access     Public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: 'Product not found!' });
    }
}));

// @desc       Delete a single product
// @route      DELETE /api/product/:id
// @access     Public
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if(product) {
        await product.remove();
        res.status(200);
        res.json({ message : 'Product removed'});
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
    
}));

// @desc       Create a single product
// @route      POST /api/products
// @access     Public
router.post('/', protect, admin, asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'Sample',
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        description: 'Sample description',
        rating: 0,
        numReviews: 0,
        price: 0,
        countInStock: 0
    });
    
    await product.save();
    res.status(201);
    res.json(product);
}));

export default router;