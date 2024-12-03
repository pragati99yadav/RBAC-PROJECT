// controllers/userController.js
exports.createUser = (req, res) => {
    const { username, password, role } = req.body;

    // Logic for user creation
    res.status(201).json({ message: `User ${username} created successfully` });
};
