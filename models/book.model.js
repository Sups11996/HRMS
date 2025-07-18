import mongoose, { mongo }  from "mongoose";

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    availableCopies: {
        type: Number,
    },
    category: {
        type: String
    }
})

export const Book = mongoose.model("Book", BookSchema)