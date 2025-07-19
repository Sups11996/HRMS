export const verifyLibrarian = (req, res, next) => {
    if (req.user.role !== 'librarian') {
        return res.status(403).json({
            message: 'Access denied: Librarian Only'
        })
    }
    next();
}


// only allow borrowes
export const verifyBorrower = (req, res, next) => {
    if (req.user.role !== 'borrower') {
        return res.status(403).json({
            message: 'Access denied: Borrowers only.'
        })
    }
    next();
}