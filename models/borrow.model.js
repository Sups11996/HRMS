import mongoose, { mongo } from "mongoose";

const BorrowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    returnDate: {
        type: Date,
        default: null
    }
});

export const Borrow = mongoose.model("Borrow", BorrowSchema)