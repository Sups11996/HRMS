import { Borrow } from "../models/borrow.model.js";
import { Book } from "../models/book.model.js";

export const borrowBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: "Book not found."
            })
        }

        if (book.available <= 0) {
            return res.status(400).json({
                message: "Book is not available at the moment."
            })
        }

        const borrow = new Borrow({
            userId,
            bookId,
            borrowDate: new Date(),
            returnDate: null
        })

        await borrow.save();
        book.available -= 1;
        await book.save();

        res.status(200).json({
            message: "Book borrowed successfully.",
            borrow,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}


export const returnBook = async (req, res) => {
    try {
        const { borrowId } = req.params;

        const borrow = await Borrow.findById(borrowId);

        if (!borrow || borrow.returnDate !== null) {
            return res.status(404).json({
                message: "Borrow record not found"
            })
        }

        borrow.returnDate = new Date();
        await borrow.save();

        const book = await Book.findById(borrow.bookId);
        if (book) {
            book.available += 1;
            await book.save();
        }

        res.status(200).json({
            message: "Book returned successfully.",
            borrow
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}