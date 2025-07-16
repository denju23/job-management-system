import { HTTP_STATUS } from '../constants/httpStatus.js';
import logger from '../logger/index.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS.SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  // Logging with method, route, and error message
  logger.error(`[${req.method}] ${req.originalUrl} ❌ ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

export default errorHandler;
