const jwt = require('jsonwebtoken');
const SECRET_KEY = 'this is my secret key for jsonwebtoken';

const VerifyToken = (req, res, next) => {
    let result = jwt.verify(req.headers.authorization, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
    if (result instanceof Error) {
        res.status(401).send('You are not authorized to access this endpoint');
    } else {
        next();
    }
}

module.exports = { VerifyToken }