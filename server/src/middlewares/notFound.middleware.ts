import { Request, Response } from 'express';

/**
 * 404 Not Found middleware
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: `Cannot find ${req.originalUrl} on this server`
  });
};