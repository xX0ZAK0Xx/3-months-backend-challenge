// external modules
import express from 'express';

// internal modules
import { signIn } from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post('/signin', signIn);

export default authRouter;