import { Router } from 'express';
import { BlogController, TagController } from '../controllers/blog.controller';
import { validateCreateBlog, validateCreateTag, validateUpdateBlog, validateUpdateTag } from '../validators/blog.validator';

const router = Router();
const blogController = new BlogController();
const tagController = new TagController();

// Tag routes
router.get('/tags', tagController.getTags);
router.get('/tags/:id', tagController.getTagById);
router.get('/tags/slug/:slug', tagController.getTagBySlug);
router.post('/tags', validateCreateTag, tagController.createTag);
router.put('/tags/:id', validateUpdateTag, tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);

// Blog routes
router.get('/blogs', blogController.getBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.get('/blogs/slug/:slug', blogController.getBlogBySlug);
router.get('/blogs/tag/:slug', blogController.getBlogsByTag);
router.post('/blogs', validateCreateBlog, blogController.createBlog);
router.put('/blogs/:id', validateUpdateBlog, blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);

// Blog-Tag relation routes
router.post('/blogs/:id/tags/:tagId', blogController.addTagToBlog);
router.delete('/blogs/:id/tags/:tagId', blogController.removeTagFromBlog);

export default router;