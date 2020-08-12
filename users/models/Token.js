const jwt = require('jsonwebtoken');

class Token {
    static async generate(userId, expr = "2 days") {
        return  jwt.sign({ userId, expr }, process.env.JWT_KEY);
    }
}

module.exports = Token;