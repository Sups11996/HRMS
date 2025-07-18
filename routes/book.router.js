import express from 'express'
import {
    createbook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} from '../controller/book.controller.js'

const router = express.Router();

router.post('/addBook', createbook);
router.get('/getAllBooks', getAllBooks);
router.get('/getBookById/:id',getBookById);
router.put('/updateBook/:id', updateBook);
router.delete('/deleteBook/:id', deleteBook);

export default router