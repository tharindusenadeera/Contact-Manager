const express = require('express');
const { loginUser, registerUser, getCurrentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.route('/current').get(validateToken, getCurrentUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
