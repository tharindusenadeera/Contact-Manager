const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

//@desc current user
//@route GET /api/user/current
//@access private

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json({ message: 'Get current user', data: user });
});

//@desc Register user
//@route POST /api/user/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req?.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }

  const isUserAvailable = await User.findOne({ email });
  if (isUserAvailable) {
    res.status(400);
    throw new Error('User already registered!');
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ message: 'User created!', data: { _id: user?._id, email: user?.email } });
  } else {
    res.status(400);
    throw new Error('User data is not valid!');
  }
});

//@desc User login
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req?.body;
  if (!username || !password) {
    res.status(400);
    throw new Error('Enter a valid username and password!');
  }
  res.status(201).json({ message: 'User logged in' });
});

module.exports = {
  getCurrentUser,
  registerUser,
  loginUser,
};
