const mongoose = require('mongoose')

const latestSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    course: {
        type: String
    },
    student_id: {
        type: mongoose.Types.ObjectId
    },
    classroom: {
        type: mongoose.Types.ObjectId
    },
    card_uid: {
        type: String,
    },
    date: {
        type: Date
    }
})

module.exports = mongoose.model('History', latestSchema)