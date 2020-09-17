const Student = require('../models/student.model')
const Classroom =  require('../models/classroom.model')

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
            const classroom = await Classroom.findOne({name: req.body.classroom})

            if (classroom) {
                const {year, month, day} = req.body.birthdate
                const birthdate = new Date(year, month, day + 1)

                const student =  new Student({
                    name: req.body.name,
                    last_name: req.body.last_name,
                    card_uid: req.body.card_uid.toUpperCase(),
                    birthdate: birthdate,
                    classroom: classroom._id
                })
                const savedStudent =  await student.save()
                const result = await classroom.updateOne({$push: {students: savedStudent}})
    
                return res.status(200).json(result)
            }
            return res.status(400).json({error: `The classroom ${req.body.classroom} does not exist, create it in first place`})
        } 
        catch (e) {
            console.log(e)
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