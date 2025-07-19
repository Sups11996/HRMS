import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        // check for the bearer token
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: 'Unauthorized: No token provided.'
            })
        }

        const token = authHeader.aplit(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}