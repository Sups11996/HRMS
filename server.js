import express from 'express';
import connectDB from './config/database.js';

import UserRouter from './routes/user.route.js'
import BookRouter from './routes/book.route.js'
import authRouter from './routes/auth.route.js'

const PORT = 3000

const app = express();
app.use(express.json());


app.use('/api',UserRouter);
app.use('/api',BookRouter);
app.use('/api',authRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
