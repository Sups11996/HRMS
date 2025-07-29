import { Book } from "../models/book.model.js";
import generateSixDigitId from '../utils/id.generator.js';

// add a new book
export const createbook = async (req, res) => {
    try {
        const { title, author, isbn, available } = req.body;

        if (!title || !author || !isbn || !available) {
            return res.status(400).json({
                message: "Please fill out all the required fields.",
            });
        }

        if (!/^[A-Za-z ]+$/.test(author)) return res.status(400).json({ message: 'Author name should contain only letters' });
        if (typeof available !== "number" || available < 0) return res.status(400).json({ message: 'Available copies should be a non-negative number' });

        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({
                message: "This book already exists in the library.",
            });
        }

        const bookId = generateSixDigitId();
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
            saveBook,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

// get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(201).json({
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
export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: 'Book not found'
            })
        }
        res.status(201).json({
            message: 'Updated Book Successfully.',
            updatedBook,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

// deleting a book
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)

        if (!deletedBook) {
            return res.status(404).json({
                message: 'Book not found.',
            })
        }
        res.status(201).json({
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