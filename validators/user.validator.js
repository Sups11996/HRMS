import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string()
        .trim()               // <--- add trim here
        .min(3)
        .required()
        .messages({
            'string.base': 'Name should be a text',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least 3 characters long',
            'any.required': 'Name is required'
        }),
    email: Joi.string()
        .trim()               // <--- add trim here
        .email()
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required'
        }),
    role: Joi.string()
        .trim()               // optional if role might have spaces accidentally
        .valid('librarian', 'borrower')
        .required()
        .messages({
            'any.only': 'Role must be either librarian or borrower',
            'any.required': 'Role is required'
        }),
});

export const updateUserSchema = Joi.object({
    name: Joi.string()
        .trim()               // add trim here too
        .min(3)
        .messages({
            'string.base': 'Name should be a text',
            'string.min': 'Name must be at least 3 characters long',
        }),
    email: Joi.string()
        .trim()               // add trim here too
        .email()
        .messages({
            'string.email': 'Email must be a valid email address',
        }),
    password: Joi.string()   // optional to trim password
        .min(8)
        .messages({
            'string.min': 'Password must be at least 8 characters long',
        })
}).min(1)
  .messages({
    'object.min': 'At least one field must be provided for update'
});
