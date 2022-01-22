import express from'express';
import dotenv from 'dotenv';

// Dummy data
import products from './data/products.js';

// DB
import connectDB from './config/db.js'

// Routes
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

