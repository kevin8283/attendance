const Joi = require('joi')

const attendanceMiddleware = {
    validateCreateBlankList: function(req, res, next) {
        const schema = Joi.object({
            id: Joi.string().hex().length(24).required()
        })

        const result = schema.validate(req.body)

        if (result.error) {
            return res.status(400).json(result.error.details[0].message)
        }
        return next()
    },

    validateAddStudentToList: function (req, res, next) {
        const schema = Joi.object({
            uid: Joi.string().hex().length(8).required()
        })

        const result = schema.validate(req.body)

        if (result.error) {
            return res.status(400).json(result.error.details[0].message)
        }
        return next()
    }
}

module.exports = {attendanceMiddleware}