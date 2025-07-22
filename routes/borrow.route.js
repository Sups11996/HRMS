import express from 'express'

import { borrowBook, returnBook } from '../controller/borrow.controller'
import { verifyToken } from '../middleware/auth.middleware.js';
import { verifyLibrarian, verifyBorrower } from '../middleware/role.middleware.js'

const router = express.Router();

router.post('/borrow', verifyToken, verifyBorrower, borrowBook);

router.put('/return/:bookId', verifyToken, verifyBorrower, returnBook);


export default router;