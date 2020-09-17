const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    classroom: {
        type: String
    }
})

module.exports = mongoose.model('Course', courseSchema)