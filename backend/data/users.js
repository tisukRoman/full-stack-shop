const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Roman Tyschuk',
        email: 'tisukroman@gmail.com',
        password: bcrypt.hashSync('123456', 8),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'example@gmail.com',
        password: bcrypt.hashSync('123456', 8),
    },
    {
        name: 'Silver White',
        email: 'exammpple@gmail.com',
        password: bcrypt.hashSync('123456', 8),
    },
];

module.exports = users;