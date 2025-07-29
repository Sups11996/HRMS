import express from 'express';

import {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
} from '../controller/user.controller.js'
import { validate } from '../middleware/validate.middleware.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { verifyLibrarian } from '../middleware/role.middleware.js';


const router = express.Router();

router.post('/auth/register', validate(createUserSchema), createUser);
router.get('/getAllUsers', verifyToken, verifyLibrarian, getAllUsers);
router.get('/getUserById/:id', verifyToken, verifyLibrarian, getUserById);
router.put('/updateUser/:id', verifyToken, verifyLibrarian, validate(updateUserSchema), updateUser);
router.delete('/deleteUser/:id', verifyToken, verifyLibrarian, deleteUser);

export default router;
