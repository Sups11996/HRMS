import Joi from 'joi';

export const createBookSchema = Joi.object({
    title: Joi.string().trim().required(),
    author: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    isbn: Joi.string().length(13).pattern(/^\d+$/).required(),
    available: Joi.number().min(0).required()
});

export const updateBookSchema = Joi.object({
    title: Joi.string().trim(),
    author: Joi.string().trim(),
    category: Joi.string().trim(),
    available: Joi.number().min(0)
}).min(1);
