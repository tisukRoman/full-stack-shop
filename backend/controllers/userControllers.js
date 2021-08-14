const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateJWT = require('../utils/generateJWT');


// @desc    Auth User & get Token
// @route   POST api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateJWT(user._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
})


// @desc    REGISTER A NEW USER
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
        res.status(400);
        throw new Error('User aslready exists');
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateJWT(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})


// @desc    FETCH USER PROFILE
// @route   GET api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})


// @desc    UPDATE USER PROFILE
// @route   PUT api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    const { name, email, password } = req.body; // new data to update

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateJWT(updatedUser._id)
        })

    } else {
        res.status(404);
        throw new Error('User not found')
    }
})


// @desc    GET ALL USERS
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})


// @desc    DELETE A USER
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    await user.remove();
    res.json({ message: 'User was deleted' })
})


// @desc    GET USER BY ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.json(user)
})


// @desc    UPDATE USER DATA
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    const { name, email, isAdmin } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
    })
})





module.exports = {
    authUser,
    getUsers,
    getUserProfile,
    registerUser,
    updateUserProfile,
    deleteUser,
    getUserById,
    updateUser
}