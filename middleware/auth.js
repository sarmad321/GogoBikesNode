const jwt = require('jsonwebtoken')

function auth (req , res , next) { 
    const token = req.header('Authorization').split("Bearer ")[1]
    if (!token) {
        return res.status(401).send("Access denied , no token provided")
    }

    try {
        const decoded = jwt.verify(token , 'privateKey')
        req.user = decoded
        next()
    }
    catch (ex) { 
            res.status(400).send("invalid token")
    }
}
module.exports = auth;