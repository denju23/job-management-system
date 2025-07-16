import Job from '../models/Job.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import logger from '../logger/index.js';

// Create a job
export const createJob = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const job = await Job.create({
    title,
    description,
    status,
    userId: req.user.id,
  });

  logger.info(`Job created by ${req.user.email} (${req.user.id})`);

  res.status(HTTP_STATUS.CREATED).json(job);
});

// Get all jobs
export const getJobs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, title, search, sort = '-createdAt' } = req.query;

  const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };

  if (status) {
    filter.status = status;
  }

  if (title) {
    filter.title = new RegExp(title, 'i'); // case-insensitive match
  }

  if (search) {
    filter.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') }
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const jobs = await Job.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Job.countDocuments(filter);

  logger.info(`Jobs fetched for ${req.user.email} | page ${page}`);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
    data: jobs,
  });
});


// Update job
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Job not found');
  }

  // Only owner or admin can update
  if (req.user.role !== 'admin' && job.userId.toString() !== req.user.id) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Access denied');
  }

  const { title, description, status } = req.body;

  job.title = title || job.title;
  job.description = description || job.description;
  job.status = status || job.status;

  const updatedJob = await job.save();

  logger.info(`Job updated by ${req.user.email} - Job ID: ${job._id}`);

  res.status(HTTP_STATUS.OK).json(updatedJob);
});

// Delete job
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Job not found');
  }

  if (req.user.role !== 'admin' && job.userId.toString() !== req.user.id) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Access denied');
  }

  await job.deleteOne();

  logger.info(`Job deleted by ${req.user.email} - Job ID: ${job._id}`);

  res.status(HTTP_STATUS.OK).json({ message: 'Job deleted successfully' });
});
