// external modules
import express from 'express';

// internal modules
import { createUser, getAllUsers, updateUser } from '../controllers/userController.js';
import validateRole from '../middlewares/validateRole.js';

const userRouter = express.Router();

userRouter.post('/', validateRole('admin'), createUser);
userRouter.patch('/:id', validateRole('admin', 'manager'), updateUser);
userRouter.get('/', validateRole('admin', 'manager', 'user'), getAllUsers);

export default userRouter;