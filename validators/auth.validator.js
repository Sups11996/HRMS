import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email().trim().required().messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required'
    }),
    password: Joi.string().trim().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters',
        'string.empty': 'Password is required'
    })
});
