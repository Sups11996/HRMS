import mongoose, { mongo } from "mongoose";
import { Book } from './book.model.js';

const UserSchema = new mongoose.Schema({
    _id: {
        type: String, // Change from ObjectId to String
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['borrower', 'librarian'],
        required: true
    },
    borrowedBooks: [{
        type: String,
        ref: 'Book'
    }],
})

export const User = mongoose.model("User", UserSchema)
