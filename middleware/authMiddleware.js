// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

exports.authorize = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    next();
};
