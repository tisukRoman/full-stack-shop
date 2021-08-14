const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleWare/authMiddleware');
const {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createReview,
    getTopProducts
} = require('../controllers/productControllers');


router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router.route('/top')
    .get(getTopProducts)

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct)

router.route('/:id/review')
    .post(protect, createReview)

module.exports = router;