import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import ApiError from '../utils/apiError.js';
import {validateCreateUser, validateUpdateUser} from '../validator/validator.js';

const getAllUsers = async (req, res, next) => {
    try {
        // get all users
        const users = await User.find();
        const simplifiedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }));
        return res.status(200).json({success: true, data: simplifiedUsers});
    } catch (error) {
        // Pass unexpected errors to global handler
        next(ApiError.internal(error.message || 'Something went wrong'));
    }
}

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    const { error } = validateCreateUser(req.body);
    if (error) {
      return next(ApiError.badRequest(error.details[0].message));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(ApiError.badRequest('User already exists'));
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    // Send success response
    return res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    // Pass unexpected errors to global handler
    next(ApiError.internal(error.message || 'Something went wrong'));
  }
};

const updateUser = async (req, res, next) => {
    try {
        // get user by id
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(ApiError.notFound('User not found'));
        }

        // validate body
        const { error } = validateUpdateUser(req.body);
        if (error) {
            return next(ApiError.badRequest(error.details[0].message));
        }

        // update user
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({success: true, data: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        }});
    } catch (error) {
        // Pass unexpected errors to global handler
        next(ApiError.internal(error.message || 'Something went wrong'));
    }
}

export {getAllUsers, createUser, updateUser};