import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: {
        type: String, // Change from ObjectId to String
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['borrower', 'librarian']
    },
    borrowedBooks: [{
        type: String,
        ref: 'Book'
    }],
})

export const User = mongoose.model("User", UserSchema)