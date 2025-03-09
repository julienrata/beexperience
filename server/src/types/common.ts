import { Request, Response, NextFunction } from 'express';

// Types for Express handlers
export type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

// Types for query parameters
export type PaginationParams = {
  page?: number;
  limit?: number;
  sort?: string;
};

// Type for query results with pagination
export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};