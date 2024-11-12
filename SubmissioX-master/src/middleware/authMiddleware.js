const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).send('A token is required');

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};
