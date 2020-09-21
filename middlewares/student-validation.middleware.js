const Joi = require('joi')

const studentMiddleware = {

    validateAddStudent: function(req, res, next) {
        const studentSchema = Joi.object({
            name: Joi.string().min(2).max(25).required(),
            last_name: Joi.string().min(2).max(25).required(),
            birthdate: Joi.object({
                day: Joi.number().integer().min(1).max(31).required(),
                month: Joi.number().integer().min(0).required(),
                year: Joi.number().integer().required().min(1900).max(2020)
            }),
            classroom: Joi.string().min(2).required().alphanum(), 
            card_uid: Joi.string().length(8).hex()
        })
        
        const result = studentSchema.validate(req.body)

        if (result.error) {
            return res.json({error: result.error.details[0].message})
        }
        return next()
    },

    validateEditStudent: function(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().min(2).max(25),
            last_name: Joi.string().min(2).max(25),
            card_uid: Joi.string().hex().length(8)
        })

        const result = schema.validate(req.body)

        if (result.error) {
            return res.json({error: result.error.details[0].message})
        }
        return next()
    }
}

module.exports = {studentMiddleware}