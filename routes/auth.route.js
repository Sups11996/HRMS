import express from 'express';

import { loginUser } from '../controller/login.controller';

const router = express.Router();

router.post('/login', loginUser)

export default router;