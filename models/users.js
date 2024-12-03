const users = [
    { id: 1, username: 'admin', password: '$2b$10$...', role: 'Admin' },  // Use bcrypt to hash passwords
    { id: 2, username: 'user', password: '$2b$10$...', role: 'User' },
    { id: 3, username: 'moderator', password: '$2b$10$...', role: 'Moderator' }
];

module.exports = users;
