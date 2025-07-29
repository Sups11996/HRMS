import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { generateId } from '../utils/id.generator.js';
import {validate} from '../middleware/validate.middleware.js';
import { createUserSchema, updateUserSchema } from '../validators/user.validator.js';

// Create a new user
export const createUser = [
    validate(createUserSchema), 
async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // check for existing user
        const alreadyExists = await User.findOne({ email });
        if (alreadyExists) {
            return res.status(400).json({
                message: 'This email is already used.'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await generateId();

        const newUser = new User({
            _id: userId,
            name,
            email,
            password: hashedPassword,
            role,
        });

        // save the user
        const saveUser = await newUser.save();

        // show the new user
        const userResponse = saveUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'User created successfully.',
            userResponse,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}];

// Get user by id
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).populate('borrowedBooks', 'title _id');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        };
        res.status(200).json({
            message: 'User fetched successfully',
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('borrowedBooks', 'title _id');
        res.status(200).json({
            message: 'All the users',
            users,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const updateUser = [
    validate(updateUserSchema),
    async (req, res) => {
        try {
            const updates = req.body;

            // If password is being updated, hash it
            if (updates.password) {
                const salt = await bcrypt.genSalt(10);
                updates.password = await bcrypt.hash(updates.password, salt);
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const userObj = updatedUser.toObject();
            delete userObj.password;

            res.status(200).json({
                message: 'User updated successfully.',
                updatedUser: userObj
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
];


// delete user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found.'
            })
        }

        res.status(201).json({
            message: 'User deleted successfully',
            deletedUser
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}