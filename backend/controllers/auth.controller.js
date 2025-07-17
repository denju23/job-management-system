import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';
import logger from '../logger/index.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  logger.info(`Register attempt: ${email}`);

  const userExists = await User.findOne({ email });
  if (userExists) {
    logger.warn(`Register failed: ${email} already exists`);
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'User already exists');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',

    });

    const token = generateToken(user);

    res.status(HTTP_STATUS.CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    logger.error(`Register failed for ${email} ❌ ${err.message}`);
    throw err;
  }
});


export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  logger.info(`Login attempt: ${email}`);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn(`Invalid login for: ${email}`);
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid email or password');
    }

    const token = generateToken(user);

    res.status(HTTP_STATUS.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    logger.error(`Login failed for ${email} ❌ ${err.message}`);
    throw err;
  }
});


export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(HTTP_STATUS.OK).json(users);
});
