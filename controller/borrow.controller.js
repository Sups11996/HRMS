import { formatCustomDate } from "../utils/date.formatter.js";
import { Borrow } from "../models/borrow.model.js";
import { Book } from "../models/book.model.js";
import { User } from "../models/user.model.js";
import { validate } from '../middleware/validate.middleware.js';
import { borrowSchema } from '../validators/borrow.validator.js';
import { returnBookSchema } from '../validators/borrow.validator.js';

export const borrowBook = [
    validate(borrowSchema),
    async (req, res) => {
        try {
            const { userId, bookId } = req.body;

            const activeBorrows = await Borrow.countDocuments({ userId, returnDate: null });
            if (activeBorrows >= 3) {
                return res.status(400).json({
                    message: "You have reached the maximum number of borrowed books (3)."
                });
            }

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

            const borrowDate = new Date();
            const dueDate = new Date(borrowDate);
            dueDate.setDate(dueDate.getDate() + 7);

            const borrow = new Borrow({
                userId,
                bookId,
                borrowDate,
                dueDate,
                returnDate: null
            })

            await borrow.save();
            book.available -= 1;
            await book.save();

            await User.findByIdAndUpdate(userId, { $push: { borrowedBooks: bookId } });

            const populatedBorrow = await Borrow.findById(borrow._id)
                .populate('userId', '_id name email')
                .populate('bookId', '_id title');

            const response = {
                "userid": populatedBorrow.userId._id,
                "user name": populatedBorrow.userId.name,
                "email": populatedBorrow.userId.email,
                "book id": populatedBorrow.bookId._id,
                "book name": populatedBorrow.bookId.title,
                "borrowed date": formatCustomDate(populatedBorrow.borrowDate),
                "due date": formatCustomDate(populatedBorrow.dueDate)
            };

            res.status(200).json({
                message: "Book borrowed successfully.",
                borrow: response,
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }]

export const getAllBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find()
            .populate('userId', '_id name email')
            .populate('bookId', '_id title');

        const formattedBorrows = borrows.map(b => ({
            "userid": b.userId._id,
            "user name": b.userId.name,
            "email": b.userId.email,
            "book id": b.bookId._id,
            "book name": b.bookId.title,
            "borrowed date": formatCustomDate(b.borrowDate),
            "due date": formatCustomDate(b.dueDate)
        }));

        res.status(200).json({
            message: "All borrow records retrieved successfully.",
            borrows: formattedBorrows,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


export const returnBook = [
    validate(returnBookSchema),
    async (req, res) => {
        try {
            const { userId, bookId } = req.body;

            const borrow = await Borrow.findOne({ userId, bookId, returnDate: null });

            if (!borrow) {
                return res.status(404).json({
                    message: "Borrow record not found"
                })
            }

            borrow.returnDate = new Date();

            if (borrow.returnDate > borrow.dueDate) {
                const overdueDays = Math.ceil((borrow.returnDate - borrow.dueDate) / (1000 * 60 * 60 * 24));
                borrow.fine = overdueDays * 10; // 10 units of fine per overdue day
            }

            await borrow.save();

            const book = await Book.findById(borrow.bookId);
            if (book) {
                book.available += 1;
                await book.save();
            }

            await User.findByIdAndUpdate(borrow.userId, { $pull: { borrowedBooks: borrow.bookId } });

            const populatedBorrow = await Borrow.findById(borrow._id)
                .populate('userId', '_id name email')
                .populate('bookId', '_id title');

            const response = {
                "userid": populatedBorrow.userId._id,
                "user name": populatedBorrow.userId.name,
                "email": populatedBorrow.userId.email,
                "book id": populatedBorrow.bookId._id,
                "book name": populatedBorrow.bookId.title,
                "borrowed date": formatCustomDate(populatedBorrow.borrowDate),
                "due date": formatCustomDate(populatedBorrow.dueDate)
            };

            res.status(200).json({
                message: "Book returned successfully.",
                borrow: response
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
];