import { logEvents } from './logger.js';

const errorHandlerMiddleware = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  );

  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  };
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = 400;
  }
  if (err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.msg, isError: true });
};

export default errorHandlerMiddleware;
