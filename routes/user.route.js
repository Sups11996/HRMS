import express from 'express';

import {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
} from '../controller/user.controller.js'

const router = express.Router();

router.post('/auth/register', createUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserById/:id', getUserById);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id',deleteUser);

export default router;