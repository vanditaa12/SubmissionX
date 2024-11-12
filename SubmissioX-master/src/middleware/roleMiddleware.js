exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Access denied'); // Check if user is not admin
    }
    next(); // Proceed to the next middleware
};
