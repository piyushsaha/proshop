const express = require('express');

// Dummy data
const products = require('./data/products');

const app = express();

app.listen(5000, console.log("Server running"));

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product._id === req.params.id);
    res.json(product);
});