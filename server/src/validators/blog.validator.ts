import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors/AppError';
import {
  CreateBlogDto,
  UpdateBlogDto,
  CreateTagDto,
  UpdateTagDto,
} from '../dtos/blog.dto';

export const validateCreateBlog = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    title,
    content,
    excerpt,
    author,
    tags,
    featuredImage,
    status,
  }: CreateBlogDto = req.body;

  if (!title || title.trim() === '') {
    return next(new AppError('Blog title is required', 400));
  }

  if (!content || content.trim() === '') {
    return next(new AppError('Blog content is required', 400));
  }

  if (!excerpt || excerpt.trim() === '') {
    return next(new AppError('Blog excerpt is required', 400));
  }

  if (!author) {
    return next(new AppError('Blog author is required', 400));
  }

  if (status && !['draft', 'published'].includes(status)) {
    return next(
      new AppError('Blog status must be either "draft" or "published"', 400)
    );
  }

  if (tags && !Array.isArray(tags)) {
    return next(new AppError('Tags must be an array', 400));
  }

  if (featuredImage && featuredImage.trim() === '') {
    return next(new AppError('image excerpt is required', 400));
  }

  next();
};

export const validateUpdateBlog = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    title,
    content,
    excerpt,
    tags,
    featuredImage,
    status,
  }: UpdateBlogDto = req.body;

  if (title !== undefined && title.trim() === '') {
    return next(new AppError('Blog title cannot be empty', 400));
  }

  if (content !== undefined && content.trim() === '') {
    return next(new AppError('Blog content cannot be empty', 400));
  }

  if (excerpt !== undefined && excerpt.trim() === '') {
    return next(new AppError('Blog excerpt cannot be empty', 400));
  }

  if (status && !['draft', 'published'].includes(status)) {
    return next(
      new AppError('Blog status must be either "draft" or "published"', 400)
    );
  }

  if (tags && !Array.isArray(tags)) {
    return next(new AppError('Tags must be an array', 400));
  }

  if (featuredImage && featuredImage.trim() === '') {
    return next(new AppError('image excerpt is required', 400));
  }
  next();
};

export const validateCreateTag = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, description }: CreateTagDto = req.body;

  if (!name || name.trim() === '') {
    return next(new AppError('Tag name is required', 400));
  }

  if (!description || description.trim() === '') {
    return next(new AppError('Tag description is required', 400));
  }

  next();
};

export const validateUpdateTag = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, description }: UpdateTagDto = req.body;

  if (name !== undefined && name.trim() === '') {
    return next(new AppError('Tag name cannot be empty', 400));
  }

  if (!description || description.trim() === '') {
    return next(new AppError('Tag description is required', 400));
  }

  next();
};
