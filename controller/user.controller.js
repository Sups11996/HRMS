import { trusted } from 'mongoose';
import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt'

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: 'Please fill out all the required fields.'
            })
        }

        // check for existing user
        const alreadyExists = await User.findOne({ email });
        if (alreadyExists) {
            return res.status(400).json({
                message: 'This email is already used.'
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
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
}

// Get user by id
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).populate('borrowedBooks');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        };
        res.status(201).json({
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
        const users = await User.find().populate('borrowedBooks');
        res.status(201).json({
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

// update user
export const updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await User.findByIdAndDelete(
            req.params.id,
            updates,
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({
                message: 'User not found.'
            })
        }

        res.status(201).json({
            message: 'User updated successfully.',
            updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

// delete user
export const deleteUser = async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            return res.status(404).json({
                message: 'User not found.'
            })
        }

        res.status(201).json({
            message: 'User deleted successfully',
            deletedUser
        })
    }catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}