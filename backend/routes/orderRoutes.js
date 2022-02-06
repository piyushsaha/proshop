import express from 'express';
import asyncHandler from 'express-async-handler';

// Model
import Order from '../models/orderModel.js'

// Auth middleware
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc       Create new order
// @route      POST /api/orders
// @access     Private
router.post('/', protect, asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    // If empty order is requested
    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items!');
    }
    const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
}));

// @desc       Get an order by its ID
// @route      GET /api/orders/:id
// @access     Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
    // Populate the user foreign key reference with only name and email
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if(order) {
        res.status(200);
        res.json(order);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));

export default router;