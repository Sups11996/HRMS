import mongoose from "mongoose";

const BorrowSchema = new mongoose.Schema({
    userId: {
        type: String,   // Change from ObjectId to String
        ref: 'User',
        required: true
    },
    bookId: {
        type: String,
        ref: 'Book',
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        default: null
    },
    fine: {
        type: Number,
        default: 0
    }
});

export const Borrow = mongoose.model("Borrow", BorrowSchema)
