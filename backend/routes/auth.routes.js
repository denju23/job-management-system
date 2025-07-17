import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import validateRequest from '../middlewares/validateRequest.js';
import { body } from 'express-validator';
import { getAllUsers } from '../controllers/auth.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

// Validation rules
export const registerValidationRules = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),

  body('email')
    .isEmail().withMessage('Valid email is required')
    .isLength({ max: 100 }).withMessage('Email must be at most 100 characters'),

  body('password')
    .isLength({ min: 8, max: 30 }).withMessage('Password must be between 8 and 30 characters')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character')
];

const loginValidationRules = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Routes
router.post('/register', registerValidationRules, validateRequest, registerUser);
router.post('/login', loginValidationRules, validateRequest, loginUser);
router.get('/users', protect(['admin']), getAllUsers);


export default router;
