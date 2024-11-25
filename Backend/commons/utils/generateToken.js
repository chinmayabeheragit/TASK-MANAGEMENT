const jwt = require('jsonwebtoken');

const generateToken = (email, role) => {
    try {
        return jwt.sign({ email, role }, process.env.SECRET_KEY);
    } catch (error) {
        throw error;
    }
};
module.exports = {
    generateToken
}