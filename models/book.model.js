import mongoose, { mongo } from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    isbn: {
        type: String,
        unique: true
    },
    quantity: {
        type: Number
    },
    available: {
        type: Number
    }
})

export const Book = mongoose.model("Book", BookSchema)