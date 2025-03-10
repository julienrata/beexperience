import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors/AppError';

/**
 * Validate user creation request
 */
export const validateCreateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body;
  const errors: string[] = [];

  if (!name) errors.push('Name is required');
  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');
  
  if (password && password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Email is invalid');
  }

  if (errors.length > 0) {
    return next(AppError.badRequest(errors.join(', ')));
  }

  next();
};

/**
 * Validate user update request
 */
export const validateUpdateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password, role } = req.body;
  const errors: string[] = [];

  // Only validate fields that are present
  if (email !== undefined && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Email is invalid');
  }

  if (password !== undefined && password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (role !== undefined && !['user', 'admin'].includes(role)) {
    errors.push('Role must be either "user" or "admin"');
  }

  if (errors.length > 0) {
    return next(AppError.badRequest(errors.join(', ')));
  }

  next();
};