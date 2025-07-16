import { HTTP_STATUS } from '../constants/httpStatus.js';

class ApiError extends Error {
  constructor(statusCode = HTTP_STATUS.SERVER_ERROR, message = 'Something went wrong') {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
