import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('Authorization token not found'));
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(ApiError.unauthorized('Invalid or expired token'));
    }

    req.user = user;
    next();
  });
};

export default validateToken;
