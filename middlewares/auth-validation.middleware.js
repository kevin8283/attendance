const Joi = require('joi')
const Admin = require('../models/admin.model')

const authMiddleware = {
    validateLogin: function (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(32).required()
        })

        const result = schema.validate(req.body)

        if (result.error) {
            return res.status(400).json(result.error.details[0].message)
        }

        return next()
    },
    validateRegister: async function(req, res, next) {
        const admin = await Admin.findOne({$or: [{username: req.body.username}, {email: req.body.email}]})
        const schema = Joi.object({
            username: Joi.string().min(4).max(25).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(32).required()
        })

        const result = schema.validate(req.body)

        if (result.error) {
            res.status(400).json(result.error.details[0].message)
        }
        else {
            if (admin) {
                const equal = admin.email === req.body.email ? admin.email : admin.username
    
                return res.status(400).json(`${equal} is already taken`)
            }
            return next()
        }
    }
}

module.exports = {authMiddleware}