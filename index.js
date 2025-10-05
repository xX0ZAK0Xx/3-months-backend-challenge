// external modules
import express from 'express';
import dotenv from 'dotenv';

// internal modules
import errorHandler from './src/middlewares/errorHandler.js';
import ApiError from './src/utils/apiError.js';
import connectDB from './src/config/dbConnect.js';
import authRouter from './src/routes/authRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import validateToken from './src/middlewares/validateToken.js';

// configuration
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', authRouter);
app.use('/users', validateToken, userRouter);

// Error handler
app.use((req, res, next) => {
    next(ApiError.notFound(`Cannot find ${req.originalUrl}`));
});
app.use(errorHandler);


app.listen(PORT, () => console.log('Server running on port ' + PORT));
