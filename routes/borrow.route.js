import express from 'express'

import { borrowBook, returnBook, getAllBorrows } from '../controller/borrow.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js';
import { verifyBorrower, verifyLibrarian } from '../middleware/role.middleware.js'

const router = express.Router();

router.post('/borrow', verifyToken, verifyBorrower, borrowBook);

router.put('/return/:bookId', verifyToken, verifyBorrower, returnBook);

router.get('/all', verifyToken, verifyLibrarian ,getAllBorrows);


export default router;
