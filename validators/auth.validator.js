import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().min(8).required()
});