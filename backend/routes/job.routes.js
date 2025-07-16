import express from 'express';
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} from '../controllers/job.controller.js';

import protect from '../middlewares/auth.middleware.js';
import validateRequest from '../middlewares/validateRequest.js';
import { body, query } from 'express-validator';

const router = express.Router();

// Middleware: user or admin
router.use(protect(['user', 'admin']));

// Validators
const jobValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('status').optional().isIn(['open', 'in progress', 'done']).withMessage('Invalid status value'),
];

const jobQueryValidationRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['open', 'in progress', 'done']).withMessage('Invalid status'),
  query('sort').optional().isString(),
  query('title').optional().isString(),
  query('search').optional().isString(),
];
// Routes
router.post('/', jobValidationRules, validateRequest, createJob);
router.get('/', jobQueryValidationRules, validateRequest, getJobs);
router.put('/:id', jobValidationRules, validateRequest, updateJob);
router.delete('/:id', deleteJob);

export default router;


