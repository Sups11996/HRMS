import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
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
    borrowedBooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    employeeId: String,

})

export const User = mongoose.model("User", UserSchema)