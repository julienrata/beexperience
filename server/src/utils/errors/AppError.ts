/**
 * Custom error class for application errors
 * Implements Factory Method pattern for error creation
 */
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  /**
   * Constructor
   * @param message Error message
   * @param statusCode HTTP status code
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Factory method for Bad Request error (400)
   * @param message Error message
   */
  static badRequest(message = 'Bad request'): AppError {
    return new AppError(message, 400);
  }

  /**
   * Factory method for Unauthorized error (401)
   * @param message Error message
   */
  static unauthorized(message = 'Unauthorized'): AppError {
    return new AppError(message, 401);
  }

  /**
   * Factory method for Forbidden error (403)
   * @param message Error message
   */
  static forbidden(message = 'Forbidden'): AppError {
    return new AppError(message, 403);
  }

  /**
   * Factory method for Not Found error (404)
   * @param message Error message
   */
  static notFound(message = 'Resource not found'): AppError {
    return new AppError(message, 404);
  }

  /**
   * Factory method for Conflict error (409)
   * @param message Error message
   */
  static conflict(message = 'Conflict'): AppError {
    return new AppError(message, 409);
  }

  /**
   * Factory method for Internal Server error (500)
   * @param message Error message
   */
  static internal(message = 'Internal server error'): AppError {
    return new AppError(message, 500);
  }
}