import { IService } from '../interfaces/service.interface';
import {
  BlogDto,
  BlogDtoMapper,
  BlogQuery,
  CreateBlogDto,
  CreateTagDto,
  TagDto,
  TagDtoMapper,
  UpdateBlogDto,
  UpdateTagDto,
} from '../dtos/blog.dto';
import { BlogRepository } from '../repositories/BlogRepository';
import { TagRepository } from '../repositories/TagRepository';
import { AppError } from '../utils/errors/AppError';
import { PaginatedResult } from '../types/common';
import mongoose from 'mongoose';
import { IBlog } from '../models/Blog';

export class TagService implements IService<TagDto, void> {
  private tagRepository: TagRepository;

  constructor() {
    this.tagRepository = new TagRepository();
  }

  async getAll(_query?: void): Promise<PaginatedResult<TagDto>> {
    const tags = await this.tagRepository.findAll();
    const tagDtos = TagDtoMapper.toDtoList(tags);
    
    // Return in PaginatedResult format to match interface
    return {
      data: tagDtos,
      pagination: {
        total: tagDtos.length,
        page: 1,
        limit: tagDtos.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      }
    };
  }

  async getById(id: string): Promise<TagDto> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new AppError('Tag not found', 404);
    }
    return TagDtoMapper.toDto(tag);
  }

  async getBySlug(slug: string): Promise<TagDto> {
    const tag = await this.tagRepository.findBySlug(slug);
    if (!tag) {
      throw new AppError('Tag not found', 404);
    }
    return TagDtoMapper.toDto(tag);
  }

  async create(createTagDto: CreateTagDto): Promise<TagDto> {
    const tag = await this.tagRepository.create(createTagDto);
    return TagDtoMapper.toDto(tag);
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<TagDto> {
    const updatedTag = await this.tagRepository.update(id, updateTagDto);
    if (!updatedTag) {
      throw new AppError('Tag not found', 404);
    }
    return TagDtoMapper.toDto(updatedTag);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.tagRepository.delete(id);
    if (!deleted) {
      throw new AppError('Tag not found', 404);
    }
    return true;
  }
}

export class BlogService implements IService<BlogDto, BlogQuery> {
  private blogRepository: BlogRepository;
  private tagRepository: TagRepository;

  constructor() {
    this.blogRepository = new BlogRepository();
    this.tagRepository = new TagRepository();
  }

  async getAll(
    query?: BlogQuery
  ): Promise<PaginatedResult<BlogDto>> {
    const blogs = await this.blogRepository.findAll(query);
    const total = await this.blogRepository.countAll(query);
    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const totalPages = Math.ceil(total / limit);
    
    const blogDtos = BlogDtoMapper.toDtoList(blogs);

    return {
      data: blogDtos,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  async getById(id: string): Promise<BlogDto> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }
    return BlogDtoMapper.toDto(blog);
  }

  async getBySlug(slug: string): Promise<BlogDto> {
    const blog = await this.blogRepository.findBySlug(slug);
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }
    return BlogDtoMapper.toDto(blog);
  }

  async create(data: Partial<BlogDto> | CreateBlogDto): Promise<BlogDto> {
    // We need to be able to accept Partial<BlogDto> according to the interface
    // while still handling the specific CreateBlogDto that our implementation uses
    const createBlogDto = data as CreateBlogDto;
    
    // Create the blog data object with all properties
    const blogData: Partial<IBlog> = {
      // Copy fields from the DTO
      ...(createBlogDto.title && { title: createBlogDto.title }),
      ...(createBlogDto.content && { content: createBlogDto.content }),
      ...(createBlogDto.excerpt && { excerpt: createBlogDto.excerpt }),
      ...(createBlogDto.featuredImage && { featuredImage: createBlogDto.featuredImage }),
      ...(createBlogDto.status && { status: createBlogDto.status }),
    };
    
    // Handle author field separately with proper type conversion
    if (createBlogDto.author) {
      if (typeof createBlogDto.author === 'string') {
        // If it's a string, convert to ObjectId
        blogData.author = new mongoose.Types.ObjectId(createBlogDto.author);
      } else {
        // We shouldn't get here with our current implementation, but handle just in case
        // eslint-disable-next-line no-console
        console.warn('Unexpected author type:', typeof createBlogDto.author);
        
        // Try to safely convert to string then ObjectId
        try {
          const authorId = String(createBlogDto.author);
          blogData.author = new mongoose.Types.ObjectId(authorId);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to convert author to ObjectId:', error);
          // Use a default ObjectId if conversion fails
          blogData.author = new mongoose.Types.ObjectId();
        }
      }
    }
    
    const blog = await this.blogRepository.create(blogData);

    // Add tags if provided
    if (createBlogDto.tags && createBlogDto.tags.length > 0) {
      // Cast blog._id to string safely
      const blogId = blog._id instanceof mongoose.Types.ObjectId
        ? blog._id.toString()
        : typeof blog._id === 'string'
          ? blog._id
          : String(blog._id);
          
      for (const tagId of createBlogDto.tags) {
        await this.blogRepository.addTag(blogId, tagId);
      }
    }

    // Cast blog._id to string safely
    const blogId = blog._id instanceof mongoose.Types.ObjectId
      ? blog._id.toString()
      : typeof blog._id === 'string'
        ? blog._id
        : String(blog._id);
        
    const updatedBlog = await this.blogRepository.findById(blogId);
    if (!updatedBlog) {
      throw new AppError('Failed to create blog', 500);
    }

    return BlogDtoMapper.toDto(updatedBlog);
  }

  async update(id: string, data: Partial<BlogDto> | UpdateBlogDto): Promise<BlogDto> {
    // Cast to UpdateBlogDto to handle our specific implementation
    const updateBlogDto = data as UpdateBlogDto;
    
    let blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    // Update the blog without tags first
    const { tags, ...blogData } = updateBlogDto;
    const updatedBlog = await this.blogRepository.update(id, blogData);
    if (!updatedBlog) {
      throw new AppError('Failed to update blog', 500);
    }

    // Update tags if provided
    if (tags) {
      // Remove all existing tags
      for (const tagId of blog.tags) {
        await this.blogRepository.removeTag(id, tagId.toString());
      }

      // Add new tags
      for (const tagId of tags) {
        await this.blogRepository.addTag(id, tagId);
      }
    }

    // Get the updated blog with all relations
    blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new AppError('Blog not found after update', 500);
    }

    return BlogDtoMapper.toDto(blog);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.blogRepository.delete(id);
    if (!deleted) {
      throw new AppError('Blog not found', 404);
    }
    return true;
  }

  async incrementViewCount(id: string): Promise<BlogDto> {
    const blog = await this.blogRepository.incrementViewCount(id);
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }
    return BlogDtoMapper.toDto(blog);
  }

  async addTag(blogId: string, tagId: string): Promise<BlogDto> {
    // Check if blog exists
    const blog = await this.blogRepository.findById(blogId);
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    // Check if tag exists
    const tag = await this.tagRepository.findById(tagId);
    if (!tag) {
      throw new AppError('Tag not found', 404);
    }

    const updatedBlog = await this.blogRepository.addTag(blogId, tagId);
    if (!updatedBlog) {
      throw new AppError('Failed to add tag to blog', 500);
    }

    return BlogDtoMapper.toDto(updatedBlog);
  }

  async removeTag(blogId: string, tagId: string): Promise<BlogDto> {
    // Check if blog exists
    const blog = await this.blogRepository.findById(blogId);
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    // Check if tag exists
    const tag = await this.tagRepository.findById(tagId);
    if (!tag) {
      throw new AppError('Tag not found', 404);
    }

    const updatedBlog = await this.blogRepository.removeTag(blogId, tagId);
    if (!updatedBlog) {
      throw new AppError('Failed to remove tag from blog', 500);
    }

    return BlogDtoMapper.toDto(updatedBlog);
  }

  async getByTag(
    tagSlug: string,
    query?: BlogQuery
  ): Promise<PaginatedResult<BlogDto>> {
    const tag = await this.tagRepository.findBySlug(tagSlug);
    if (!tag) {
      throw new AppError('Tag not found', 404);
    }

    const completeQuery: BlogQuery = {
      ...query,
      tag: tagSlug,
    };

    const blogs = await this.blogRepository.findAll(completeQuery);
    const total = await this.blogRepository.countAll(completeQuery);
    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const totalPages = Math.ceil(total / limit);
    
    const blogDtos = BlogDtoMapper.toDtoList(blogs);

    return {
      data: blogDtos,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }
}
