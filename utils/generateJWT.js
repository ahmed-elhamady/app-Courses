

const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '3m' });
    return token;
};

module.exports = generateToken;
