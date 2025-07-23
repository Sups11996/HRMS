import express from 'express'
import {
    createbook,
    getAllBooks,
    updateBook,
    deleteBook
} from '../controller/book.controller.js'

import { verifyToken } from '../middleware/auth.middleware.js';
import { verifyLibrarian, verifyBorrower } from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/addBook', verifyToken, verifyLibrarian, createbook);
router.get('/getAllBooks', getAllBooks);
router.put('/updateBook/:id', verifyToken, verifyLibrarian, updateBook);
router.delete('/deleteBook/:id', verifyToken, verifyLibrarian, deleteBook);

export default router