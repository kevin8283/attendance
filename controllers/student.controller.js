const Student = require('../models/student.model')

const studentController = {
    getStudents: async function(req, res) {
        try {
            const students = await Student.find()

            return res.status(200).json(students)
        }
        catch(e) {
            return res.status(500).json(e)
        }
    },

    findStudent: async function(req, res) {
        try {
            const student = await Student.findById(req.params.id)

            if (student) {
                return res.status(200).json(student)   
            }
            return res.status(404).json({error: `No student matches the id ${req.params.id}`})
        }
        catch(e) {
            return res.status(500).json(e)
        }
    },

    addStudent: async function(req, res) {
        try {
            const student =  new Student({
                name: req.body.name,
                last_name: req.body.last_name,
                card_uid: req.body.card_uid
            })
            const savedStudent =  await student.save()

            return res.status(200).json(savedStudent)
        } 
        catch (e) {
            return res.status(500).json(e)
        }
    },

    editStudent: async function(req, res) {
        try {
            const result = await Student.findByIdAndUpdate(req.params.id, req.body, {
                useFindAndModify: false
            })

            return res.status(200).json(result)
        } 
        catch(e) {
            return res.status(500).json(e)
        }
    },

    deleteStudent: async function(req, res) {
        try {
            const result = await Student.findByIdAndDelete(req.params.id, {
                useFindAndModify: false
            })
            
            return res.status(200).json(result)
        } 
        catch(e) {
            return res.status(500).json(e)
        }
    }
}

module.exports = {studentController}