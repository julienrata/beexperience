/**
 * Application constants
 */

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
} as const;

// API response status codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500
} as const;

// API error messages
export const ERROR_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  RESOURCE_NOT_FOUND: 'Resource not found',
  INTERNAL_SERVER_ERROR: 'Internal server error'
} as const;