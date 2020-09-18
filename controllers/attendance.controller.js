const Attendance = require('../models/attendance.model')
const Course = require('../models/course.model')
const Student = require('../models/student.model')
const Classroom = require('../models/classroom.model')

const attendanceController = {

    //Get all the attendances list
    getAttendances: async function (req, res) {
        try {
            const attendances = await Attendance.find()
        
            return res.status(200).json(attendances)   
        } 
        catch (e) {
            return res.status(500).json(e.message)
        }
    },

    //The request body must contain the ID of the course
    createBlankList: async function(req, res) {
        try {
            const date = new Date()
            const day = date.getDate() + 1
            const month = date.getMonth()
            const year = date.getFullYear()
            const dateNow = new Date(year, month, day)
    
            const course = await Course.findById(req.body.id)
            const classroom = await Classroom.findOne({name: course.classroom.toUpperCase()})
            const existingAttendance = await Attendance.findOne({date: dateNow, course: course})

            if (existingAttendance) {
                return res.status(400).json({error: `There is already an existing attendance list for ${course.name}, for today`})
            }
            else {
                console.log(existingAttendance)
                const attendance = new Attendance({
                    date: dateNow,
                    course: course,
                    classroom: classroom._id
                })
        
                const result = await attendance.save()
    
                return res.status(200).json(result)
            }
        } 
        catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
    },
    addStudentToCurrentList: async function(req, res) {
       try {
            const options = {
                useFindAndModify: false
            }

            const date = new Date()
            const day = date.getDate() + 1
            const month = date.getMonth()
            const year = date.getFullYear()
            const dateNow = new Date(year, month, day)

            const projection = "_id name last_name classroom card_uid"
            const student = await Student.findOne({card_uid: req.body.uid.toUpperCase()}, projection)

            if (student) {
                const attendance = await Attendance.findOne({date: dateNow, "classroom": student.classroom})

                if (attendance) {
                    if (attendance.students.findIndex((index, item) => toString(item._id) === toString(student._id)) !== -1) {
                        return res.status(400).json(`${student.name} ${student.last_name} is already in the list`)
                    }
                    const result = await attendance.updateOne({$push: {students: student}}, options)

                    return res.status(200).json(result)
                }
                return res.status(404).json(`No attendance list found`)
            }
            return res.status(404).json(`No student found matching the Card: ${req.body.uid}`) 
       } 
       catch (e) {
           return res.status(500).send(e)
       }
    }
}

module.exports = {attendanceController}