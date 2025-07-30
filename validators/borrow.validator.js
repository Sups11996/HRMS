import Joi from 'joi';

export const borrowSchema = Joi.object({
    userId: Joi.string().trim().length(6).required(),
    bookId: Joi.string().trim().length(6).required(),
});

export const returnBookSchema = Joi.object({
    userId: Joi.string().trim().length(6).required(),
    bookId: Joi.string().trim().length(6).required(),
});
