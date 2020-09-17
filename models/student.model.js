const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 25
    },
    last_name: {
        type: String,
        required: true,
        min: 2,
        max: 25
    },
    birthdate: {
        type: Date
    },
    classroom: {
        type: mongoose.Types.ObjectId
    },
    card_uid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchema)