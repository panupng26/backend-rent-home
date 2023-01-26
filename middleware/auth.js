const jwt = require('jsonwebtoken');
const config = process.env
const verifyToken = (req, res, next) => {
    const token = req.headers['token']
    if (!token) {
        return res.status(403).json({ status: false, error: true, message: "A token is required for authentication" })
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.user = decoded
    }catch(err) {
        console.error(err)
        return res.status(401).json({ status: false, error: true, message:"Invalid Token" })
    }

    return next();
}

module.exports = verifyToken