import { FilterValue, IRepository, QueryOptions } from '../interfaces/repository.interface';
import { Blog, IBlog, Tag } from '../models/Blog';
import mongoose from 'mongoose';
import { BlogQuery } from '../dtos/blog.dto';

// Define a type for the MongoDB document ID
type MongoId = mongoose.Types.ObjectId | string;

export class BlogRepository implements IRepository<IBlog> {
  async findAll(query?: BlogQuery, options?: QueryOptions): Promise<IBlog[]> {
    // Extract query parameters
    const {
      status,
      tag,
      author,
      search,
      page = 1,
      limit = 10,
      sort = '-createdAt',
    } = query || {};

    // Define specific filter type for blogs
    type BlogFilter = {
      status?: string;
      author?: mongoose.Types.ObjectId;
      tags?: { $in: mongoose.Types.ObjectId[] };
      $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
    };
    
    const filter: BlogFilter = {};

    if (status) {
      filter.status = status;
    }

    if (author) {
      filter.author = new mongoose.Types.ObjectId(author);
    }

    if (tag) {
      const tagObj = await Tag.findOne({ slug: tag });
      if (tagObj) {
        // Cast tagObj._id to mongoose.Types.ObjectId to fix type error
        let tagId: mongoose.Types.ObjectId;
        
        if (tagObj._id instanceof mongoose.Types.ObjectId) {
          tagId = tagObj._id;
        } else if (typeof tagObj._id === 'string') {
          tagId = new mongoose.Types.ObjectId(tagObj._id);
        } else if (tagObj._id && typeof tagObj._id.toString === 'function') {
          tagId = new mongoose.Types.ObjectId(tagObj._id.toString());
        } else {
          // Fallback with type assertion if all else fails
          tagId = new mongoose.Types.ObjectId(String(tagObj._id as MongoId));
        }
          
        filter.tags = { $in: [tagId] };
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    // Setup options from either BlogQuery or passed QueryOptions
    const queryOptions: QueryOptions = options || {};
    
    if (!queryOptions.skip && page) {
      queryOptions.skip = (page - 1) * (limit || 10);
    }
    
    if (!queryOptions.limit && limit) {
      queryOptions.limit = limit;
    }
    
    if (!queryOptions.sort && sort) {
      queryOptions.sort = sort;
    }

    // Build and execute the query
    let queryBuilder = Blog.find(filter);

    if (queryOptions.sort) {
      queryBuilder = queryBuilder.sort(queryOptions.sort);
    }
    
    if (queryOptions.skip) {
      queryBuilder = queryBuilder.skip(queryOptions.skip);
    }
    
    if (queryOptions.limit) {
      queryBuilder = queryBuilder.limit(queryOptions.limit);
    }
    
    // Always populate these relationships
    queryBuilder = queryBuilder
      .populate('author', 'firstName lastName')
      .populate('tags');
      
    return queryBuilder;
  }

  async findById(id: string): Promise<IBlog | null> {
    return Blog.findById(id)
      .populate('author', 'firstName lastName')
      .populate('tags');
  }

  async findBySlug(slug: string): Promise<IBlog | null> {
    return Blog.findOne({ slug })
      .populate('author', 'firstName lastName')
      .populate('tags');
  }

  async create(data: Partial<IBlog>): Promise<IBlog> {
    const blog = new Blog({
      ...data,
      slug: this.generateSlug(data.title || ''),
      viewCount: 0,
    });

    if (data.status === 'published' && !data.publishedAt) {
      blog.publishedAt = new Date();
    }

    return blog.save();
  }

  async update(id: string, data: Partial<IBlog>): Promise<IBlog | null> {
    const updates: Partial<IBlog> = { ...data };

    if (data.title) {
      updates.slug = this.generateSlug(data.title);
    }

    if (data.status === 'published' && !data.publishedAt) {
      const blog = await Blog.findById(id);
      if (blog && !blog.publishedAt) {
        updates.publishedAt = new Date();
      }
    }

    return Blog.findByIdAndUpdate(id, updates, { new: true })
      .populate('author', 'firstName lastName')
      .populate('tags');
  }

  async delete(id: string): Promise<boolean> {
    const result = await Blog.findByIdAndDelete(id);
    return !!result;
  }

  async incrementViewCount(id: string): Promise<IBlog | null> {
    return Blog.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
  }

  async addTag(blogId: string, tagId: string): Promise<IBlog | null> {
    return Blog.findByIdAndUpdate(
      blogId,
      { $addToSet: { tags: tagId } },
      { new: true }
    )
      .populate('author', 'firstName lastName')
      .populate('tags');
  }

  async removeTag(blogId: string, tagId: string): Promise<IBlog | null> {
    return Blog.findByIdAndUpdate(
      blogId,
      { $pull: { tags: tagId } },
      { new: true }
    )
      .populate('author', 'firstName lastName')
      .populate('tags');
  }

  // This is a specialized method for BlogRepository
  async countAll(query?: BlogQuery): Promise<number> {
    const { status, tag, author, search } = query || {};

    type BlogFilter = {
      status?: string;
      author?: mongoose.Types.ObjectId;
      tags?: { $in: mongoose.Types.ObjectId[] };
      $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
    };

    const filter: BlogFilter = {};

    if (status) {
      filter.status = status;
    }

    if (author) {
      filter.author = new mongoose.Types.ObjectId(author);
    }

    if (tag) {
      const tagObj = await Tag.findOne({ slug: tag });
      if (tagObj) {
        // Cast tagObj._id to mongoose.Types.ObjectId to fix type error
        let tagId: mongoose.Types.ObjectId;
        
        if (tagObj._id instanceof mongoose.Types.ObjectId) {
          tagId = tagObj._id;
        } else if (typeof tagObj._id === 'string') {
          tagId = new mongoose.Types.ObjectId(tagObj._id);
        } else if (tagObj._id && typeof tagObj._id.toString === 'function') {
          tagId = new mongoose.Types.ObjectId(tagObj._id.toString());
        } else {
          // Fallback with type assertion if all else fails
          tagId = new mongoose.Types.ObjectId(String(tagObj._id as MongoId));
        }
          
        filter.tags = { $in: [tagId] };
      }
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    return Blog.countDocuments(filter);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }

  async findOne(criteria: Record<string, FilterValue>): Promise<IBlog | null> {
    // Avoid any casting by implementing proper typing
    return Blog.findOne(criteria)
      .populate('author', 'firstName lastName')
      .populate('tags');
  }
  
  async count(filter?: Record<string, FilterValue>): Promise<number> {
    // Avoid any casting by implementing proper typing
    return Blog.countDocuments(filter || {});
  }
}