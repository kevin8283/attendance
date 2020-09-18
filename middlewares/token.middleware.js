const jwt = require('jsonwebtoken')
const token_secret = process.env.TOKEN_SECRET

const tokenMiddleware = {
    checkToken: async function(req, res, next) {
        const token = req.cookies.authToken

        if (token === undefined) {
            return res.status(403).json(`You are not authenticated`)
        }
        const decodedToken = await jwt.verify(token, token_secret)
        if (decodedToken) {
            next()
        }
        return res.status(403).json('Your token is invalid')
    }
}

module.exports = {tokenMiddleware}