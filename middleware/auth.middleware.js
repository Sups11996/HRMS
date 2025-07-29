import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // check for the bearer token
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: 'Unauthorized: No token provided.'
            })
        }

        const token = authHeader.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        // Handle JWT errors explicitly for better clarity
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Unauthorized: Token expired. Please login again.'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Unauthorized: Invalid token.'
            });
        } else {
            // For unexpected errors, you can still return 500 or 401, but 500 is clearer
            return res.status(500).json({
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }
}