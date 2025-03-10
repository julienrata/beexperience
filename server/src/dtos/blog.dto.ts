import { IBlog, ITag } from '../models/Blog';
import mongoose from 'mongoose';

export interface TagDto {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CreateTagDto {
  name: string;
  description?: string;
}

export interface UpdateTagDto {
  name?: string;
  description?: string;
}

export interface BlogDto {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string | { id: string; name: string };
  tags: TagDto[];
  featuredImage?: string;
  status: 'draft' | 'published';
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags?: string[];
  featuredImage?: string;
  status?: 'draft' | 'published';
}

export interface UpdateBlogDto {
  title?: string;
  content?: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
  status?: 'draft' | 'published';
  publishedAt?: Date;
}

export interface BlogQuery {
  status?: 'draft' | 'published';
  tag?: string;
  author?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export class TagDtoMapper {
  static toDto(tag: ITag): TagDto {
    // Handle MongoDB Document _id with type safety
    const tagId = tag._id instanceof mongoose.Types.ObjectId
      ? tag._id
      : typeof tag._id === 'object' && tag._id !== null
        ? new mongoose.Types.ObjectId(tag._id.toString())
        : new mongoose.Types.ObjectId(String(tag._id));

    return {
      id: tagId.toString(),
      name: tag.name,
      slug: tag.slug,
      description: tag.description,
    };
  }

  static toDtoList(tags: ITag[]): TagDto[] {
    return tags.map((tag) => this.toDto(tag));
  }
}

export class BlogDtoMapper {
  static toDto(blog: IBlog): BlogDto {
    // Handle MongoDB Document _id with type safety
    const blogId = blog._id instanceof mongoose.Types.ObjectId
      ? blog._id
      : typeof blog._id === 'object' && blog._id !== null
        ? new mongoose.Types.ObjectId(blog._id.toString())
        : new mongoose.Types.ObjectId(String(blog._id));

    return {
      id: blogId.toString(),
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt,
      author:
        typeof blog.author === 'object' && blog.author !== null && typeof blog.author.toString === 'function'
          ? blog.author.toString()
          : typeof blog.author === 'string' 
            ? blog.author 
            : String(blog.author),
      tags: blog.tags
        ? blog.tags.map((tag: mongoose.Types.ObjectId | ITag | string | unknown): TagDto => {
            if (typeof tag === 'string') {
              // Return a properly typed TagDto with optional description
              return { id: tag, name: '', slug: '', description: undefined };
            } else if (typeof tag === 'object' && tag !== null) {
              // Handle when tag is populated with ITag data
              if ('name' in tag && 'slug' in tag) {
                // Convert tag to a proper typed record for TypeScript
                const tagRecord = tag as Record<string, unknown>;
                // Ensure properties are strings to satisfy TagDto type
                const tagName = typeof tagRecord.name === 'string' ? tagRecord.name : String(tagRecord.name || '');
                const tagSlug = typeof tagRecord.slug === 'string' ? tagRecord.slug : String(tagRecord.slug || '');
                // Handle description which might be any type - convert to string or undefined
                const tagDesc = tagRecord.description !== undefined && tagRecord.description !== null
                  ? typeof tagRecord.description === 'string' 
                    ? tagRecord.description 
                    : String(tagRecord.description)
                  : undefined;
                
                // Handle _id properly
                let tagId = '';
                if (tagRecord._id !== undefined && tagRecord._id !== null) {
                  if (tagRecord._id instanceof mongoose.Types.ObjectId) {
                    tagId = tagRecord._id.toString();
                  } else {
                    tagId = String(tagRecord._id);
                  }
                }
                
                return {
                  id: tagId,
                  name: tagName,
                  slug: tagSlug,
                  description: tagDesc,
                };
              }
              // Handle when tag is an ObjectId or has toString method
              else if (typeof (tag as Record<string, unknown>).toString === 'function') {
                // Return a properly typed TagDto with optional description
                return { 
                  id: (tag as { toString(): string }).toString(), 
                  name: '', 
                  slug: '',
                  description: undefined 
                };
              }
            }
            // Fallback for unknown types - ensuring we return a proper TagDto
            return { 
              id: typeof tag === 'undefined' ? '' : String(tag), 
              name: '', 
              slug: '',
              description: undefined
            };
          })
        : [],
      featuredImage: blog.featuredImage,
      status: blog.status,
      viewCount: blog.viewCount,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      publishedAt: blog.publishedAt,
    };
  }

  static toDtoList(blogs: IBlog[]): BlogDto[] {
    return blogs.map((blog) => this.toDto(blog));
  }
}
