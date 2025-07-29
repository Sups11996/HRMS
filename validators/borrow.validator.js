import Joi from 'joi';

export const borrowSchema = Joi.object({
    userId: Joi.string()
        .trim()
        .length(8)
        .pattern(/^\d{8}$/)
        .required()
        .messages({
            'string.length': 'userId must be exactly 8 digits',
            'string.pattern.base': 'userId must contain only digits',
        }),
    bookId: Joi.string()
        .trim()
        .length(8)
        .pattern(/^\d{8}$/)
        .required()
        .messages({
            'string.length': 'bookId must be exactly 8 digits',
            'string.pattern.base': 'bookId must contain only digits',
        }),
});
