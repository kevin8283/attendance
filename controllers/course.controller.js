const Course = require('../models/course.model')

const courseController = {
    options: {
        useFindAndModify: false
    },
    getCourses: async function(req, res) {
        try {
            const course =  await Course.find()
            
            return res.status(200).json(course)
        } 
        catch (e) {
            return res.status(500).json(e)
        }
    },

    addCourse: async function(req, res) {
        try {
            const course =  new Course({
                name: req.body.name,
                reference: req.body.reference,
                classroom: req.body.classroom.toUpperCase()
            })
            const result = await course.save()

            return res.json(result)
        } 
        catch (e) {
            return res.status(500).json(e)
        }
    },

    findCourse: async function(req, res) {
        try {
            const course = await Course.findById(req.params.id)

            if (course) {
                return res.status(200).json(course)
            }
            return res.status(404).json({error: `No course found matching the ID ${req.params.id}`})
        } 
        catch (e) {
            return res.status(500).json(e)
        }  
    },

    updateCourse: async function(req, res) {
        try {
            const result =  await Course.findByIdAndUpdate(req.params.id, req.body, this.options)

            return res.status(200).json(result)   
        }
        catch (e) {
            return res.status(500).json(e)
        }
    },

    deleteCourse: async function(req, res) {
        try {
            const result = await Course.findByIdAndDelete(req.params.id, this.options)
            
            return res.status(200).json(result)
        }
        catch (e) {
            return res.status(500).json(e)
        }
    }
}

module.exports = {courseController}