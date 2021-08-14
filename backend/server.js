const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { notFound, errorHander } = require('./middleWare/errorMiddleware');

// GLOBAL CONSTANTS
dotenv.config();

// CONNECTING TO MONGO_DB
connectDB();

// CREATING SERVER
const app = express();

// ALLOWS USING JSON PARSER
app.use(express.json());

// API ROUTES
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// MAKING UPLOAD DIR STATIC
/* __dirname = path.resolve(); */
app.use('/uploads', express.static(path.join('./', '/uploads')))

// PRODUCTION SETTINGS
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

// ERROR HANDLERS
app.use(notFound);
app.use(errorHander);

// SERVER RUNNING
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running on port ${PORT}`)); // SERVER LISTENING


