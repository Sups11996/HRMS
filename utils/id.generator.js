export async function generateId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000 + Math.random() * 90000000).toString(); // 8 digits

        const bookExists = await Book.exists({ _id: id });
        const userExists = await User.exists({ _id: id });

        exists = bookExists || userExists;
    }

    return id;
}