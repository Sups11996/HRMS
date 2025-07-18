import express from 'express';
import connectDB from './config/database.js';

import UserRouter from './routes/user.router.js'
import BookRouter from './routes/book.router.js'

const PORT = 3000

const app = express();
app.use(express.json());


app.use('/api',UserRouter)
app.use('/api',BookRouter)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
