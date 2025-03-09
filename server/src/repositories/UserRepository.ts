import { IRepository } from '../interfaces/repository.interface';
import User, { IUser } from '../models/User';

/**
 * User Repository
 * Implements Repository Pattern for User entity
 */
export class UserRepository implements IRepository<IUser> {
  /**
   * Find all users with filtering and options
   */
  async findAll(filter: Record<string, any> = {}, options: Record<string, any> = {}): Promise<IUser[]> {
    const limit = options.limit || 10;
    const page = options.page || 1;
    const skip = (page - 1) * limit;
    const sort = options.sort || { createdAt: -1 };

    return User.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  /**
   * Find user by id
   */
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  /**
   * Find user by criteria
   */
  async findOne(criteria: Record<string, any>): Promise<IUser | null> {
    return User.findOne(criteria);
  }

  /**
   * Create new user
   */
  async create(data: Partial<IUser>): Promise<IUser> {
    return User.create(data);
  }

  /**
   * Update user by id
   */
  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
  }

  /**
   * Delete user by id
   */
  async delete(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Count users by filter
   */
  async count(filter: Record<string, any> = {}): Promise<number> {
    return User.countDocuments(filter);
  }
}