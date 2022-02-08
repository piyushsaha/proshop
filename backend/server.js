import express from'express';
import dotenv from 'dotenv';

// DB
import connectDB from './config/db.js'

// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Middlewares
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

// JSON body parser for incoming requests
app.use(express.json());

// Route handlers
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Endpoint to get the PayPal client ID
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));