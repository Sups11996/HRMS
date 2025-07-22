import express from 'express';
import connectDB from './config/database.js';

import UserRouter from './routes/user.route.js'
import BookRouter from './routes/book.route.js'
import AuthRouter from './routes/auth.route.js'
import BorrowRouter from './routes/borrow.route.js'

const PORT = 3000

const app = express();
app.use(express.json());


app.use('/api',UserRouter);
app.use('/api',BookRouter);
app.use('/api',AuthRouter);
app.use('/api',BorrowRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
