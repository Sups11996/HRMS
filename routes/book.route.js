import express from 'express'
import {
    createbook,
    getAllBooks,
    updateBook,
    deleteBook
} from '../controller/book.controller.js'

import { verifyToken } from '../middleware/auth.middleware.js';
import { verifyLibrarian } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createBookSchema } from '../validators/book.validator.js';

const router = express.Router();

router.post('/addBook', verifyToken, verifyLibrarian, validate(createBookSchema), createbook);
router.get('/getAllBooks', getAllBooks);
router.put('/updateBook/:id', verifyToken, verifyLibrarian, updateBook);
router.delete('/deleteBook/:id', verifyToken, verifyLibrarian, deleteBook);

export default router
