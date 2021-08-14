const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');


// @desc    FETCH ALL PRODUCTS
// @route   GET /api/products (?keyword&pageNumber)
// @access  Public
const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 8;
    const pageNumber = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i',
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (pageNumber - 1))
    res.json({products, pageNumber, pageCount: Math.ceil(count / pageSize)});
})


// @desc    FETCH TOP PRODUCTS
// @route   GET /api/products/top 
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({}).sort({rating: -1}).limit(3)

    res.json(products)
})


// @desc    FETCH A SINGLE PRODUCT
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    } else {
        res.json(product);
    }
})


// @desc    DELETE PRODUCT
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    await product.remove();
    res.json({ message: 'Product was deleted' })

})


// @desc    CREATE PRODUCT
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)

})


// @desc    UPDATE PRODUCT
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {

    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct)

})


// @desc    CREATE PRODUCT REVIEW
// @route   POST /api/products/:id/review
// @access  Private
const createReview = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    const alreadyReviewed = await product.reviews.find(r => r.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
        res.status(400);
        throw new Error('Already reviewed');
    }

    const { rating, comment } = req.body;

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    }

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = Number(product.reviews.reduce((total, item) => total + item.rating, 0) / product.reviews.length);

    await product.save();
    res.status(201).json({ message: 'Review created successfully' })
})


module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createReview,
    getTopProducts
}