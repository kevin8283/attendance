const Joi = require('joi')

const classroomMiddleware = {
    validateAddClassroom: function(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(2).required()
        })

        const result = schema.validate(req.body)

        if (result.error) {
            return res.json({error: result.error.details[0].message})
        }
        return next()
    },

    validateEditClassroom: function(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(2)
        })

        const result = schema.validate(req.body)

        if (result.error) {
            return res.json({error: result.error.details[0].message})
        }
        return next()
    },

    validateAddStudentToClassroom: function(req, res, next) {
        const schema = Joi.object({
            id: Joi.string().hex().length(24).required()
        })

        const result = schema.validate(req.body)

        if (result.error) {
            return res.json({error: result.error.details[0].message})
        }
        return next()
    }
}

module.exports = {classroomMiddleware}