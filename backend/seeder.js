import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

// Mongoose models
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

// Data
import users from './data/users.js';
import products from './data/products.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clearing the DB
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        
        // Adding sample users to DB
        const addedUsers = await User.insertMany(users);
        
        // Adding admin user to all products
        // and then adding the updated products to DB
        const adminUser = addedUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);
        
        console.log("Data Imported!".green.inverse);
        process.exit();
    }
    catch (error) {
        console.log(`Error: ${error}`.red.underline);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        // Clearing the DB
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit(0);
    }
    catch (error) {
        console.log(`Error: ${error}`.red.underline);
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}