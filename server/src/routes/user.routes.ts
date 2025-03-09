import express from 'express';
import { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/user.controller';
import { 
  validateCreateUser, 
  validateUpdateUser 
} from '../validators/user.validator';

const router = express.Router();

/**
 * @route /api/users
 * @desc User collection endpoints
 */
router.route('/')
  .get(getUsers)
  .post(validateCreateUser, createUser);

/**
 * @route /api/users/:id
 * @desc User resource endpoints
 */
router.route('/:id')
  .get(getUserById)
  .put(validateUpdateUser, updateUser)
  .delete(deleteUser);

export default router;