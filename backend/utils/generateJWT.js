const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    return jwt.sign(
        { id }, // payload 
        process.env.JWT_SECRET, // signature
        { expiresIn: '30d' } // time before expire
    )
}

module.exports = generateJWT