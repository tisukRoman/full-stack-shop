const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products');
const users = require('./data/users');
const connectDB = require('./config/db');
const Product = require('./models/productModel');
const User = require('./models/userModel')
const Order = require('./models/orderModel');

dotenv.config();    

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(p => {
            return { ...products, user: adminUser }
        });

        await Product.insertMany(sampleProducts);

        console.log('Data is imported!!!');
        process.exit();

    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data is destroyed!!!');
        process.exit();

    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
