import { FilterValue, IRepository, QueryOptions } from '../interfaces/repository.interface';
import { ITag, Tag } from '../models/Blog';

export class TagRepository implements IRepository<ITag> {
  async findAll(filter?: Record<string, FilterValue>, options?: QueryOptions): Promise<ITag[]> {
    let query = Tag.find(filter || {});
    
    if (options?.sort) {
      query = query.sort(options.sort);
    } else {
      query = query.sort({ name: 1 });
    }
    
    if (options?.skip) {
      query = query.skip(options.skip);
    }
    
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    if (options?.populate) {
      // Handle different types of populate options
      if (Array.isArray(options.populate)) {
        // If it's an array of strings, process each one
        options.populate.forEach(populateOption => {
          query = query.populate(populateOption as string);
        });
      } else if (typeof options.populate === 'string') {
        // If it's a string, use directly
        query = query.populate(options.populate);
      } else {
        // If it's an object, convert to PopulateOptions format
        const populateOptions = options.populate as Record<string, unknown>;
        query = query.populate({
          path: populateOptions.path as string,
          select: populateOptions.select as string | undefined,
          model: populateOptions.model as string | undefined,
          match: populateOptions.match as Record<string, unknown> | undefined,
          options: populateOptions.options as Record<string, unknown> | undefined
        });
      }
    }
    
    return query;
  }

  async findById(id: string): Promise<ITag | null> {
    return Tag.findById(id);
  }

  async findBySlug(slug: string): Promise<ITag | null> {
    return Tag.findOne({ slug });
  }

  async create(data: Partial<ITag>): Promise<ITag> {
    const tag = new Tag({
      ...data,
      slug: this.generateSlug(data.name || ''),
    });
    return tag.save();
  }

  async update(id: string, data: Partial<ITag>): Promise<ITag | null> {
    const updates: Partial<ITag> = { ...data };

    if (data.name) {
      updates.slug = this.generateSlug(data.name);
    }

    return Tag.findByIdAndUpdate(id, updates, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Tag.findByIdAndDelete(id);
    return !!result;
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }

  async findOne(criteria: Record<string, FilterValue>): Promise<ITag | null> {
    return Tag.findOne(criteria);
  }
  
  async count(filter?: Record<string, FilterValue>): Promise<number> {
    return Tag.countDocuments(filter || {});
  }
}
