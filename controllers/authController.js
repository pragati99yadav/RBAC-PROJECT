// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = []; // Temporary in-memory storage

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
