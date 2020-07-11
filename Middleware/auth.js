const jwt = require("jsonwebtoken");
const config = require('config');

function token(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No Token provided..');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).send('Invalid Token..');
    }
}
module.exports = token;