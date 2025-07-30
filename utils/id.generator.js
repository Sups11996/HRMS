import { Book } from '../models/book.model.js';
import { User } from '../models/user.model.js';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function getRandomId(length = 6) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * characters.length);
        result += characters[randIndex];
    }
    return result;
}

export async function generateId() {
    let id;
    let exists = true;

    while (exists) {
        id = getRandomId(6);

        const bookExists = await Book.exists({ _id: id });
        const userExists = await User.exists({ _id: id });

        exists = bookExists || userExists;
    }

    return id;
}