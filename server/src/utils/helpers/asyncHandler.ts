import { Request, Response, NextFunction } from 'express';
import { ExpressHandler } from '../../types/common';

/**
 * Async handler to eliminate try-catch blocks in controllers
 * Implements Strategy Pattern for consistent error handling
 *
 * @param fn The async function to execute
 * @returns Express middleware function
 */
export const asyncHandler = (fn: ExpressHandler): ExpressHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
