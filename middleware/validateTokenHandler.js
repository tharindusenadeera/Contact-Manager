const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req?.headers?.authorization || req?.headers?.Authorization;
  console.log('=== authHeader ===', authHeader);
  if (authHeader && authHeader?.startsWith('Bearer')) {
    token = authHeader?.split(' ')[1];
    jwt?.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized!');
      }
      req.user = decode?.user;
      console.log('=== req.user ===', req.user);
      console.log('Calling next()');
      next();
    });

    // if (!token) {
    //   res.status(401);
    //   throw new Error('User is not authorized or token is missing');
    // }
  } else {
    console.log('No token provided or invalid format');
    res.status(401).json({ message: 'User is not authorized or token is missing' });
  }
});

module.exports = validateToken;
