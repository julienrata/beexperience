import request from 'supertest';
import app from '../../app';
import User from '../../models/User';

describe('User Controller', () => {
  beforeEach(async () => {
    // Clear the users collection before each test
    await User.deleteMany({});
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 400 for invalid input', async () => {
      const userData = {
        name: 'Test User',
        email: 'invalid-email',
        password: 'pass'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/users', () => {
    it('should return all users with pagination', async () => {
      // Create test users
      await User.create([
        { 
          name: 'User 1', 
          email: 'user1@example.com', 
          password: 'password123' 
        },
        { 
          name: 'User 2', 
          email: 'user2@example.com', 
          password: 'password123' 
        }
      ]);

      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.total).toBe(2);
    });

    it('should filter users by query parameters', async () => {
      // Create test users
      await User.create([
        { 
          name: 'Admin User', 
          email: 'admin@example.com', 
          password: 'password123',
          role: 'admin' 
        },
        { 
          name: 'Regular User', 
          email: 'user@example.com', 
          password: 'password123',
          role: 'user' 
        }
      ]);

      const response = await request(app)
        .get('/api/users?role=admin')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].role).toBe('admin');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by id', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .get(`/api/users/${user._id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', user._id.toString());
      expect(response.body.name).toBe(user.name);
      expect(response.body.email).toBe(user.email);
    });

    it('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/60f0123456789a1234567890')
        .expect(404);
    });
  });

  // Add more tests for PUT and DELETE endpoints
});