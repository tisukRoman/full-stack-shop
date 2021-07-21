const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Roman Tyschuk',
        email: 'tisukroman@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'example@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        password: 'hg97hvicxjnkz',
    },
    {
        name: 'Silver White',
        email: 'exammpple@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        password: '3rfcxvrgw',
    },
];

module.exports = users;