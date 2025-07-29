import express from 'express';
import { loginUser } from '../controller/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/login', validate(loginSchema), loginUser);

export default router;
