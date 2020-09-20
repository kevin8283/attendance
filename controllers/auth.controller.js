const Admin = require('../models/admin.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const token_secret = process.env.TOKEN_SECRET

const authController = {
    login: async function(req, res) {
        try {
            const admin = await Admin.findOne({email: req.body.email.toLowerCase()})

            if (admin) {
                const result = await bcrypt.compare(req.body.password, admin.password)

                if (result) {
                    const token = await jwt.sign({
                        id: admin._id, 
                        username: admin.username,
                    }, token_secret, {expiresIn: 1000 * 60 * 5})

                    res.cookie('authToken', token, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true})
                    return res.status(200).json(result)
                }
                return res.status(400).json({"error": "Password is incorrect"})
            }
            return res.status(404).json(`No account match the email ${req.body.email}`)
        } 
        catch (e) {
            console.log(e)
            res.status(500).send(e.message)    
        }
    },
    
    register: async function(req, res) {
        try {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            const admin = new Admin({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })

            const result = await admin.save()

            return res.status(200).json(result)
        }
        catch(e) {
            console.log(e)
            res.status(500).send(e.message)    
        }
    },

    checkIfLoggedIn: function(req, res) {
        try {
            const token = req.cookies.authToken

            if (token) {
                res.status(200).json(true)
            }

            return res.status(401).json(false)   
        } 
        catch(error) {
            console.log(error.message)

            return res.status(500).json(error.message)
        }
    },

    logout: function(req, res) {
        res.clearCookie('authToken')

        return res.status(200).json('Your are now logged out')
    }
}

module.exports = {authController}