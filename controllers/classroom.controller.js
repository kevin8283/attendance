const Classroom = require('../models/classroom.model')
const Student = require('../models/student.model')

const classroomController = {

    //Get all the classrooms
    getClassrooms: async function(req, res) {
        try {
            const classrooms = await Classroom.find()

            return res.status(200).json(classrooms)
        }
        catch(e) {
            console.log(e)
            return res.status(500).send(e)
        }
    },

    //Find a specific classroom with its id, provided in the request URL as a params
    findClassroom: async function(req, res) {
        try {
            if (req.params.id) {
                const classroom = await Classroom.findById(req.params.id)

                return res.status(200).json(classroom)
            }
            
            return res.json({error: "The request URL must contain a id params"})
        } 
        catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
    },

    //Create a blank classroom
    createClassroom: async function(req, res) {
        try {
            const classroom = new Classroom({name: req.body.name})
            const result = await classroom.save()

            return res.status(200).json(result)   
        } 
        catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
    },

    //Add a student to a specific classroom, 
    //a parameter "id" must be supplied in the request URL, it will be used to fetch de matching classroom
    //the body of the request must contain the id of the student, ie {id: "your id here"}
    addStudentToClassroom: async function(req, res) {
        try {
            if (req.params.id) {
                const options = {
                    useFindAndModify: false
                }
                const student = await Student.findById(req.body.id)
    
                if (student) {
                    const result =  await Classroom.findByIdAndUpdate(req.params.id, {
                        $push: {students: student}
                    }, options)

                    if (result) {
                        return res.status(200).json(result)
                    }
                    return res.json({error: `No classroom found matching the ID ${req.params.id}`})
                }
    
                return res.json({error: `No student match the id ${req.params.id}`})
            }
    
            return res.json({error: "The request URL must contain a \"id\" param"})   
        }
        catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }  
    },

    //The url must contain an "id" param
    editClassroom: async function (req, res) {
        try {
            const options = {
                useFindAndModify: false
            }
            const result = await Classroom.findByIdAndUpdate(req.params.id, req.body, options)
    
            return res.status(200).json(result)   
        }
        catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
    },

    //The url must contain an "id" param
    deleteClassroom: async function(req, res) {
        try {
            if (req.params.id) {
                const options = {
                    useFindAndModify: false
                }
                const result = await Classroom.findByIdAndDelete(req.params.id, options)

                return res.status(200).json(result)
            }
            
            return res.json({error: "The request URL must contain a id param"})
        } 
        catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
    }
}

module.exports = {classroomController}