import { Request, Response } from 'express';
import { asyncHandler } from '../utils/helpers/asyncHandler';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

// Create dependencies using dependency injection
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

/**
 * Get all users with pagination and filtering
 * @route GET /api/users
 */
export const getUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const result = await userService.getAll(req.query);
  res.json(result);
});

/**
 * Get user by ID
 * @route GET /api/users/:id
 */
export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user = await userService.getById(req.params.id);
  res.json(user);
});

/**
 * Create new user
 * @route POST /api/users
 */
export const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userData: CreateUserDto = req.body;
  const user = await userService.create(userData);
  res.status(201).json(user);
});

/**
 * Update user
 * @route PUT /api/users/:id
 */
export const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userData: UpdateUserDto = req.body;
  const user = await userService.update(req.params.id, userData);
  res.json(user);
});

/**
 * Delete user
 * @route DELETE /api/users/:id
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await userService.delete(req.params.id);
  res.status(204).send();
});