const mongoose = require('mongoose')

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    students: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Classroom', classroomSchema)