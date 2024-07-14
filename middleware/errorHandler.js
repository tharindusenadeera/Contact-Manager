const { errorConstants } = require('../constants');
const errorHander = (err, req, res, next) => {
  statusCode = res.statusCode ?? errorConstants.SERVER_ERROR;
  switch (statusCode) {
    case errorConstants.BAD_REQUEST:
      res.json({
        title: 'Validation Error',
        message: err?.message,
        stackTrace: err?.stack,
      });
      break;
    case errorConstants.UNAUTHORIZED:
      res.json({
        title: 'Unauthorized',
        message: err?.message,
        stackTrace: err?.stack,
      });
      break;
    case errorConstants.FORBIDDEN:
      res.json({
        title: 'Forbidden',
        message: err?.message,
        stackTrace: err?.stack,
      });
      break;
    case errorConstants.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: err?.message,
        stackTrace: err?.stack,
      });
      break;
    case errorConstants.SERVER_ERROR:
      res.json({
        title: 'Server Error',
        message: err?.message,
        stackTrace: err?.stack,
      });
      break;
    default:
      console.log('No errors found!');
      break;
  }
};

module.exports = errorHander;
