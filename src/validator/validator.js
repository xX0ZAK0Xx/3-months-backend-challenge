import Joi from "joi";
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    role: Joi.string().valid('admin', 'manager', 'user').default('user'),
});

const updateUserSchema = Joi.object({
    name: Joi.string(),
});

export const validateCreateUser = validator(createUserSchema);
export const validateUpdateUser = validator(updateUserSchema);