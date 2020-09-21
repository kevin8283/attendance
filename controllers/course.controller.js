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
            console.log(e)
            return res.status(500).send(e)
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
            console.log(e)
            return res.status(500).send(e)
        }
    },

    findCourse: async function(req, res) {
        try {
            const course = await Course.findById(req.params.id)

            if (course) {
                return res.status(200).json(course)
            }
            return res.json({error: `No course found matching the ID ${req.params.id}`})
        } 
        catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }  
    },

    updateCourse: async function(req, res) {
        try {
            const result =  await Course.findByIdAndUpdate(req.params.id, req.body, this.options)

            return res.status(200).json(result)   
        }
        catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
    },

    deleteCourse: async function(req, res) {
        try {
            const result = await Course.findByIdAndDelete(req.params.id, this.options)
            
            return res.status(200).json(result)
        }
        catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
    }
}

module.exports = {courseController}