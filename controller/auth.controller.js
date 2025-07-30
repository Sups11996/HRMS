import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema } from '../validators/auth.validator.js';

export const loginUser = [
    validate(loginSchema),
    async (req, res) => {
        try {
            const { email, password } = req.body;

            // check if the user exists or not
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    message: 'User not found.'
                })
            }

            // compare the passwords
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    message: 'Incorrect Password.'
                })
            }

            // create a JWT token
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
            );


            const { password: _, ...userData } = user.toObject();

            res.status(200).json({
                message: 'Login Successful',
                token,
                user: userData
            });


        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }]