import express from 'express';
import userRoutes from './user.routes';

const router = express.Router();

// Health check route
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV
  });
});

// Mount route groups
router.use('/users', userRoutes);

export default router;