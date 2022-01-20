import express from'express';
import dotenv from 'dotenv';

// Dummy data
import products from './data/products.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product._id === req.params.id);
    res.json(product);
});