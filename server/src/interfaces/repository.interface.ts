/**
 * Type for supported filter values in queries
 */
export type FilterValue = string | number | boolean | Date | RegExp | Array<string | number> | Record<string, unknown> | null;

/**
 * Type for query options like pagination, sorting, etc.
 */
export interface QueryOptions {
  limit?: number;
  skip?: number;
  page?: number;
  sort?: Record<string, 1 | -1> | string;
  select?: string[] | string;
  populate?: string[] | string | Record<string, unknown>;
}

/**
 * Generic Repository Interface
 * Defines standard CRUD operations following the Repository Pattern
 */
export interface IRepository<T> {
  /**
   * Find all entities
   * @param filter Optional filter criteria
   * @param options Optional query options (pagination, sort)
   */
  findAll(filter?: Record<string, FilterValue>, options?: QueryOptions): Promise<T[]>;

  /**
   * Find one entity by id
   * @param id Entity id
   */
  findById(id: string): Promise<T | null>;

  /**
   * Find one entity by criteria
   * @param criteria Search criteria
   */
  findOne(criteria: Record<string, FilterValue>): Promise<T | null>;

  /**
   * Create new entity
   * @param data Entity data
   */
  create(data: Partial<T>): Promise<T>;

  /**
   * Update entity by id
   * @param id Entity id
   * @param data Update data
   */
  update(id: string, data: Partial<T>): Promise<T | null>;

  /**
   * Delete entity by id
   * @param id Entity id
   */
  delete(id: string): Promise<boolean>;

  /**
   * Count entities by filter
   * @param filter Filter criteria
   */
  count(filter?: Record<string, FilterValue>): Promise<number>;
}