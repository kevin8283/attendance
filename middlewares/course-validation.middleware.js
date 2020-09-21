const Joi = require('joi')

const courseMiddleware = {
    validateAddCourse: function (req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(2).required(),
            reference: Joi.string().min(4).alphanum().required(),
            classroom: Joi.string().min(2).alphanum().required()
        })

        const result = schema.validate(req.body)

        if (result.error) {
            return res.json({error: result.error.details[0].message})
        }
        return next()
    },

    validateEditCourse: function(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(2).alphanum(),
            reference: Joi.string().min(4).alphanum().required()
        })

        const result = schema.validate(req.body)

        if (result.error) {
            return res.json({error: result.error.details[0].message})
        }
        return next()
    }
}

module.exports = {courseMiddleware}