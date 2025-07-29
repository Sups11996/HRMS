export const verifyLibrarian = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: No user info found.' });
    }

    if (req.user.role !== 'librarian') {
        return res.status(403).json({ message: 'Access denied: Librarian only.' });
    }
    next();
};

export const verifyBorrower = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: No user info found.' });
    }

    if (req.user.role !== 'borrower') {
        return res.status(403).json({ message: 'Access denied: Borrowers only.' });
    }
    next();
};
