import { IService } from '../interfaces/service.interface';
import { FilterValue, IRepository } from '../interfaces/repository.interface';
import { IUser } from '../models/User';
import { AppError } from '../utils/errors/AppError';
import { PaginatedResult } from '../types/common';
import { CreateUserDto, UpdateUserDto, UserDto, UserDtoMapper } from '../dtos/user.dto';

/**
 * User query parameters interface
 */
export interface UserQuery {
  page?: number;
  limit?: number;
  sort?: string;
  name?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
}

/**
 * User Service
 * Implements Service Layer pattern for User entity
 */
export class UserService implements IService<UserDto, UserQuery> {
  /**
   * Constructor with dependency injection
   */
  constructor(private userRepository: IRepository<IUser>) {}

  /**
   * Get all users with pagination and filtering
   */
  async getAll(query: UserQuery = {}): Promise<PaginatedResult<UserDto>> {
    // Parse query parameters
    const page = parseInt(String(query.page), 10) || 1;
    const limit = parseInt(String(query.limit), 10) || 10;
    const filter: Record<string, unknown> = {};
    
    // Apply filters if provided
    if (query.name) filter.name = { $regex: query.name, $options: 'i' };
    if (query.email) filter.email = { $regex: query.email, $options: 'i' };
    if (query.role) filter.role = query.role;
    if (query.isActive !== undefined) {
      // Convert string 'true'/'false' to boolean if needed
      const isActive = typeof query.isActive === 'string' 
        ? query.isActive === 'true'
        : Boolean(query.isActive);
      filter.isActive = isActive;
    }

    // Get users with pagination
    const users = await this.userRepository.findAll(filter as Record<string, FilterValue>, { page, limit });
    const count = await this.userRepository.count(filter as Record<string, FilterValue>);

    // Calculate pagination metadata
    const totalPages = Math.ceil(count / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    // Transform entities to DTOs
    const userDtos = UserDtoMapper.toDtoList(users);

    return {
      data: userDtos,
      pagination: {
        total: count,
        page,
        limit,
        totalPages,
        hasNext,
        hasPrev
      }
    };
  }

  /**
   * Get user by id
   */
  async getById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw AppError.notFound(`User with id ${id} not found`);
    }
    
    return UserDtoMapper.toDto(user);
  }

  /**
   * Create new user
   */
  async create(data: CreateUserDto): Promise<UserDto> {
    // Check if user with the same email already exists
    const existingUser = await this.userRepository.findOne({ email: data.email });
    
    if (existingUser) {
      throw AppError.conflict(`User with email ${data.email} already exists`);
    }
    
    // Transform DTO to entity and create user
    const userData = UserDtoMapper.toEntity(data);
    const newUser = await this.userRepository.create(userData);
    
    return UserDtoMapper.toDto(newUser);
  }

  /**
   * Update user
   */
  async update(id: string, data: UpdateUserDto): Promise<UserDto> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    
    if (!existingUser) {
      throw AppError.notFound(`User with id ${id} not found`);
    }
    
    // If email is being changed, check if it's already taken
    if (data.email && data.email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findOne({ email: data.email });
      
      if (userWithEmail) {
        throw AppError.conflict(`User with email ${data.email} already exists`);
      }
    }
    
    // Update user
    const updatedUser = await this.userRepository.update(id, data);
    
    if (!updatedUser) {
      throw AppError.internal('Failed to update user');
    }
    
    return UserDtoMapper.toDto(updatedUser);
  }

  /**
   * Delete user
   */
  async delete(id: string): Promise<boolean> {
    const existingUser = await this.userRepository.findById(id);
    
    if (!existingUser) {
      throw AppError.notFound(`User with id ${id} not found`);
    }
    
    return await this.userRepository.delete(id);
  }
}