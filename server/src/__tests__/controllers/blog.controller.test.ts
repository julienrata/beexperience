import request from 'supertest';
import { setupTestApp } from '../setup';
import mongoose from 'mongoose';
import { Blog, Tag } from '../../models/Blog';
import { User } from '../../models/User';

const app = setupTestApp();

describe('Blog Controller', () => {
  let userId: string;
  let tagId: string;
  let blogId: string;

  beforeAll(async () => {
    // Create a test user
    const user = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123'
    });
    userId = user._id.toString();

    // Create a test tag
    const tag = await Tag.create({
      name: 'Test Tag',
      slug: 'test-tag',
      description: 'A test tag'
    });
    tagId = tag._id.toString();
  });

  afterAll(async () => {
    // Clean up
    await Blog.deleteMany({});
    await Tag.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('Tag Routes', () => {
    test('Should create a tag', async () => {
      const res = await request(app)
        .post('/api/blog/tags')
        .send({
          name: 'New Tag',
          description: 'A new tag for testing'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('New Tag');
      expect(res.body.data.slug).toBe('new-tag');
    });

    test('Should get all tags', async () => {
      const res = await request(app).get('/api/blog/tags');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    test('Should get tag by ID', async () => {
      const res = await request(app).get(`/api/blog/tags/${tagId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(tagId);
      expect(res.body.data.name).toBe('Test Tag');
    });

    test('Should update a tag', async () => {
      const res = await request(app)
        .put(`/api/blog/tags/${tagId}`)
        .send({
          name: 'Updated Tag',
          description: 'An updated test tag'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Updated Tag');
      expect(res.body.data.description).toBe('An updated test tag');
      expect(res.body.data.slug).toBe('updated-tag');
    });
  });

  describe('Blog Routes', () => {
    test('Should create a blog post', async () => {
      const res = await request(app)
        .post('/api/blog/blogs')
        .send({
          title: 'Test Blog Post',
          content: 'This is the content of the test blog post.',
          excerpt: 'A brief excerpt of the test blog post.',
          author: userId,
          tags: [tagId],
          status: 'draft'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Blog Post');
      expect(res.body.data.slug).toBe('test-blog-post');
      
      blogId = res.body.data.id;
    });

    test('Should get all blog posts', async () => {
      const res = await request(app).get('/api/blog/blogs');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      expect(res.body.pagination).toBeDefined();
    });

    test('Should get blog post by ID', async () => {
      const res = await request(app).get(`/api/blog/blogs/${blogId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(blogId);
      expect(res.body.data.title).toBe('Test Blog Post');
    });

    test('Should update a blog post', async () => {
      const res = await request(app)
        .put(`/api/blog/blogs/${blogId}`)
        .send({
          title: 'Updated Blog Post',
          content: 'This is the updated content of the test blog post.',
          excerpt: 'An updated brief excerpt of the test blog post.',
          status: 'published'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Updated Blog Post');
      expect(res.body.data.content).toBe('This is the updated content of the test blog post.');
      expect(res.body.data.status).toBe('published');
      expect(res.body.data.publishedAt).toBeDefined();
    });

    test('Should get blog posts by tag', async () => {
      const res = await request(app).get(`/api/blog/blogs/tag/updated-tag`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('Should delete a blog post', async () => {
      const res = await request(app).delete(`/api/blog/blogs/${blogId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeNull();
    });
  });

  describe('Tag Management', () => {
    test('Should delete a tag', async () => {
      const res = await request(app).delete(`/api/blog/tags/${tagId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeNull();
    });
  });
});