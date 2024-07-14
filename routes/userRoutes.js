const express = require('express');
const { loginUser, registerUser, getCurrentUser } = require('../controllers/userController');

const router = express.Router();

router.route('/current').get(getCurrentUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
