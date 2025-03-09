import { IUser } from "../models/User";

/**
 * User Data Transfer Object
 */
export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Creation DTO
 */
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: string;
  isActive?: boolean;
}

/**
 * User Update DTO
 */
export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isActive?: boolean;
}

/**
 * User DTO Mapper
 * Implements the Adapter pattern to transform user data between layers
 */
export class UserDtoMapper {
  /**
   * Map a user entity to a user DTO
   */
  public static toDto(user: IUser): UserDto {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Map multiple user entities to user DTOs
   */
  public static toDtoList(users: IUser[]): UserDto[] {
    return users.map(user => this.toDto(user));
  }

  /**
   * Map create user DTO to user entity
   */
  public static toEntity(dto: CreateUserDto): Partial<IUser> {
    return {
      name: dto.name,
      email: dto.email,
      password: dto.password, // Note: password should be hashed before storage
      role: dto.role,
      isActive: dto.isActive !== undefined ? dto.isActive : true
    };
  }
}