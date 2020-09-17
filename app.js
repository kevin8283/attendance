//External dependencies

const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()

//Project modules
const studentRouter = require('./routes/students.route')
const classroomRouter = require('./routes/classroom.route')

//Envs configuration
dotenv.config()

//Envs variables
const port = process.env.PORT || 5000
const dbURI = process.env.dbURI

//Database connection
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(dbURI, options, () => console.log("Connected with database"))

//Express built-in middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routing
app.use('/students', studentRouter)
app.use('/classrooms', classroomRouter)

//Server entry point
app.listen(port, () => console.log(`Server is running on port ${port}`))