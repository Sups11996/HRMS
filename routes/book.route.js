import express from 'express'
import {
    createbook,
    getAllBooks,
    borrowBook,
    updateBook,
    deleteBook
} from '../controller/book.controller.js'

const router = express.Router();

router.post('/addBook', createbook);
router.get('/getAllBooks', getAllBooks);
router.post('borrow/:id', borrowBook)
router.put('/updateBook/:id', updateBook);
router.delete('/deleteBook/:id', deleteBook);

export default router