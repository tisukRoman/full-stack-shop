const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');
const connectDB = require('./config/db');

dotenv.config(); // GLOBAL CONSTANTS 

connectDB(); // ASYNC CONNECTING TO MONGO_DB

const app = express(); // CREATING SERVER

//--------------------------// APIs
app.get('/', (req, res) => { 
    res.send('API is running...');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
});


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
