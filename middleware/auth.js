const jwt = require('jsonwebtoken')
const {Users} = require('../models/users')

async function auth (req , res , next) { 
    const token = req.header('Authorization').split("Bearer ")[1]
    if (!token) {
        return res.status(401).send("Access denied , no token provided")
    }

    try {
        const decoded = jwt.verify(token , 'privateKey')
        let result = await Users.findById(decoded.id)
        if(result){
            req.user = decoded
            next()
        }
       else {
           res.satus(400).send("invalide token")
       }
    }
    catch (ex) { 
            res.status(400).send("invalid token")
    }
}
module.exports = auth;