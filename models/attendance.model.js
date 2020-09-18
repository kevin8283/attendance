const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    course: {
        type: Object
    },
    students: {
        type: Array,
        default: []
    },
    classroom: {
        type: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model('Attendance', attendanceSchema)