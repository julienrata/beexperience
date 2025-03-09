import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors/AppError';
import mongoose from 'mongoose';

/**
 * Handle Mongoose validation errors
 */
const handleValidationError = (err: any): AppError | null => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map(val => val.message);
    return AppError.badRequest(`Validation Error: ${errors.join(', ')}`);
  }
  return null;
};

/**
 * Handle Mongoose cast errors (invalid ID)
 */
const handleCastError = (err: any): AppError | null => {
  if (err instanceof mongoose.Error.CastError) {
    return AppError.badRequest(`Invalid ${err.path}: ${err.value}`);
  }
  return null;
};

/**
 * Handle Mongoose duplicate key errors
 */
const handleDuplicateError = (err: any): AppError | null => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return AppError.conflict(`Duplicate field value: ${field}. Please use another value for ${field}: ${value}`);
  }
  return null;
};

/**
 * Global error handler middleware
 * Implements Chain of Responsibility pattern
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Default to 500 if statusCode is not set
  const appError = err instanceof AppError
    ? err
    : AppError.internal(err.message || 'Something went wrong');
  
  // Chain of responsibility pattern - try each handler in sequence
  const handlers = [
    handleValidationError,
    handleCastError,
    handleDuplicateError
  ];
  
  let finalError = appError;
  
  for (const handler of handlers) {
    const handledError = handler(err);
    if (handledError) {
      finalError = handledError;
      break;
    }
  }
  
  // Send the response
  res.status(finalError.statusCode).json({
    success: false,
    error: finalError.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};