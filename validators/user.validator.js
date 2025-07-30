import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().trim().valid('librarian', 'borrower').required(),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().trim().min(3),
    email: Joi.string().trim().email(),
    password: Joi.string().min(8)
}).min(1)
    .messages({
        'object.min': 'At least one field must be provided for update'
    });
