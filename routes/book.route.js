import express from 'express'
import {
    createbook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} from '../controller/book.controller.js'

import { verifyToken } from '../middleware/auth.middleware.js';
import { verifyLibrarian } from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/addBook', verifyToken, verifyLibrarian, createbook);
router.get('/getAllBooks', getAllBooks);
router.get('/getBook/:id', getBookById);
router.put('/updateBook/:id', verifyToken, verifyLibrarian, updateBook);
router.delete('/deleteBook/:id', verifyToken, verifyLibrarian, deleteBook);

export default router
