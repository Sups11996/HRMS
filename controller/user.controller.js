import { User } from "../models/user.model";
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            role,
            isTempPassword = false,
            requiresPasswordReset = false,
            tempPasswordExpiry,
            isActive = true,
        } = req.body;

        const validRoles = ['admin', 'manager', 'employee']
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: `Invalid role` })
        }

        const alreadyExists = await User.findOne({ $or: [{ email }, { username }] });

        const hasshedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            passwordHash,
            role,
            isTempPassword,
            requiresPasswordReset,
            tempPasswordExpiry,
            isActive
        });

        await newUser.save();

        res.status(201).json({
            message: 'User Created Successfully',userId: newUser._id
        })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}