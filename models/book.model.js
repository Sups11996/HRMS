import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    _id: {
        type: String,   // Change from ObjectId to String
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    isbn: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    available: {
        type: Number,
        required: true,
        min: 0,
    }
});

export const Book = mongoose.model('Book', BookSchema);
