const jwt = require('jsonwebtoken')

const verifyTokenMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.SECRET);

        req.user = decodedToken;
        next()

    } catch (error) {
        res.status(401).json({ error: 'Unauthorized. Invalid or missing token.' });
    }
};

module.exports = verifyTokenMiddleware;