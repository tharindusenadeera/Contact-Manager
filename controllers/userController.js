const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  const { email, password } = req?.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user?.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user?.username,
          email: user?.email,
          id: user?._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('Email or password not valid!');
  }
});

module.exports = {
  getCurrentUser,
  registerUser,
  loginUser,
};
