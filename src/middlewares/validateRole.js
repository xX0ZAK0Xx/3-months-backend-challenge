import ApiError from '../utils/apiError.js';

const validateRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('User not authenticated'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(ApiError.forbidden(`Access denied for role: ${req.user.role}`));
    }

    next();
  };
};

export default validateRole;
