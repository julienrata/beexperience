import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/helpers/asyncHandler';
import { BlogService, TagService } from '../services/BlogService';
import { BlogQuery, CreateBlogDto, CreateTagDto, UpdateBlogDto, UpdateTagDto } from '../dtos/blog.dto';

export class TagController {
  private tagService: TagService;

  constructor() {
    this.tagService = new TagService();
  }

  getTags = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const tags = await this.tagService.getAll();
    res.status(200).json({
      success: true,
      data: tags
    });
  });

  getTagById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const tag = await this.tagService.getById(id);
    res.status(200).json({
      success: true,
      data: tag
    });
  });

  getTagBySlug = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { slug } = req.params;
    const tag = await this.tagService.getBySlug(slug);
    res.status(200).json({
      success: true,
      data: tag
    });
  });

  createTag = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const createTagDto: CreateTagDto = req.body;
    const tag = await this.tagService.create(createTagDto);
    res.status(201).json({
      success: true,
      data: tag
    });
  });

  updateTag = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const updateTagDto: UpdateTagDto = req.body;
    const tag = await this.tagService.update(id, updateTagDto);
    res.status(200).json({
      success: true,
      data: tag
    });
  });

  deleteTag = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    await this.tagService.delete(id);
    res.status(200).json({
      success: true,
      data: null
    });
  });
}

export class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  getBlogs = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const query: BlogQuery = {
      status: req.query.status as 'draft' | 'published',
      tag: req.query.tag as string,
      author: req.query.author as string,
      search: req.query.search as string,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      sort: req.query.sort as string
    };

    const result = await this.blogService.getAll(query);
    
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });

  getBlogById = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const blog = await this.blogService.getById(id);
    res.status(200).json({
      success: true,
      data: blog
    });
  });

  getBlogBySlug = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { slug } = req.params;
    const blog = await this.blogService.getBySlug(slug);
    
    // Increment view count for public access
    if (blog.status === 'published') {
      await this.blogService.incrementViewCount(blog.id);
    }
    
    res.status(200).json({
      success: true,
      data: blog
    });
  });

  createBlog = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const createBlogDto: CreateBlogDto = req.body;
    const blog = await this.blogService.create(createBlogDto);
    res.status(201).json({
      success: true,
      data: blog
    });
  });

  updateBlog = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const updateBlogDto: UpdateBlogDto = req.body;
    const blog = await this.blogService.update(id, updateBlogDto);
    res.status(200).json({
      success: true,
      data: blog
    });
  });

  deleteBlog = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    await this.blogService.delete(id);
    res.status(200).json({
      success: true,
      data: null
    });
  });

  getBlogsByTag = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { slug } = req.params;
    const query: BlogQuery = {
      status: 'published', // Only published posts for public API
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      sort: req.query.sort as string
    };

    const result = await this.blogService.getByTag(slug, query);
    
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  });

  addTagToBlog = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id, tagId } = req.params;
    const blog = await this.blogService.addTag(id, tagId);
    res.status(200).json({
      success: true,
      data: blog
    });
  });

  removeTagFromBlog = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { id, tagId } = req.params;
    const blog = await this.blogService.removeTag(id, tagId);
    res.status(200).json({
      success: true,
      data: blog
    });
  });
}