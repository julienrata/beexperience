import { PaginatedResult } from '../types/common';

/**
 * Generic Service Interface
 * Defines business logic operations following the Service Layer pattern
 */
export interface IService<T, Q = Record<string, any>> {
  /**
   * Get all entities with pagination
   * @param query Query parameters
   */
  getAll(query?: Q): Promise<PaginatedResult<T>>;

  /**
   * Get one entity by id
   * @param id Entity id
   */
  getById(id: string): Promise<T>;

  /**
   * Create new entity
   * @param data Entity data
   */
  create(data: Partial<T>): Promise<T>;

  /**
   * Update entity
   * @param id Entity id
   * @param data Update data
   */
  update(id: string, data: Partial<T>): Promise<T>;

  /**
   * Delete entity
   * @param id Entity id
   */
  delete(id: string): Promise<boolean>;
}