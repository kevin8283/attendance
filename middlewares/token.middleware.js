const jwt = require('jsonwebtoken')
const token_secret = process.env.TOKEN_SECRET

const tokenMiddleware = {
    checkToken: async function(req, res, next) {
        const token = req.cookies.authToken

        if (token === undefined) {
            return res.json({error: `You are not authenticated`})
        }

        try {
            const result = await jwt.verify(token, token_secret)

            if (result) {
                return next()
            }   
        } 
        catch(error) {
            return res.json({error: `You are not authenticated`})   
        }
    }
}

module.exports = {tokenMiddleware}