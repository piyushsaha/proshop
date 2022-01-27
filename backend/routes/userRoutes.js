import express from 'express';
import asyncHandler from 'express-async-handler';

// Models
import User from '../models/userModel.js';

const router = express.Router();

// @desc       Authenticate user login
// @route      POST /api/users/login
// @access     Public
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        });
    } else {
        res.status(401);
        throw new Error('User does not exists or incorrect email or password.');
    }
}));

export default router;