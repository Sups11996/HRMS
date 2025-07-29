import { Book } from "../models/book.model.js";
import { generateId } from '../utils/id.generator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createBookSchema, updateBookSchema } from '../validators/book.validator.js';

// add a new book
export const createbook = [
    validate(createBookSchema),
    async (req, res) => {
        try {
            const { title, author, isbn, available } = req.body;

            const existingBook = await Book.findOne({ isbn });
            if (existingBook) {
                return res.status(400).json({
                    message: "This book already exists in the library.",
                });
            }

            const bookId = await generateId();
            const newBook = new Book({
                _id: bookId,
                title,
                author,
                isbn,
                available
            })

            const saveBook = await newBook.save();

            res.status(201).json({
                message: 'New book added in the library.',
                book: saveBook,
            })

        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }]

// get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json({
            message: "All books fetched.",
            books,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

// update book
export const updateBook = [
    validate(updateBookSchema),
    async (req, res) => {
        try {
            // Prevent changing ISBN
            if ('isbn' in req.body) {
                delete req.body.isbn;
            }

            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true // ✅ Enforce schema validation here
                }
            );

            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(200).json({
                message: 'Updated Book Successfully.',
                updatedBook,
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }];


// deleting a book
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)

        if (!deletedBook) {
            return res.status(404).json({
                message: 'Book not found.',
            })
        }
        res.status(200).json({
            message: 'Book deleted successfully.',
            deletedBook,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}