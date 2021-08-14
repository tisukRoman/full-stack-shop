const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleWare/authMiddleware');
const {
    authUser,
    getUsers,
    getUserProfile,
    registerUser,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUser
} = require('../controllers/userControllers');


router.route('/login')
    .post(authUser);

router.route('/')
    .get(protect, admin, getUsers)
    .post(registerUser);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser)




module.exports = router;