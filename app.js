//External dependencies

const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()

//Project modules
const studentRouter = require('./routes/students.route')
const classroomRouter = require('./routes/classroom.route')
const courseRouter = require('./routes/course.route')
const attendanceRouter = require('./routes/attendance.route')
const authRouter = require('./routes/auth.route')

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
app.use('/', authRouter)
app.use('/students', studentRouter)
app.use('/classrooms', classroomRouter)
app.use('/courses', courseRouter)
app.use('/attendance', attendanceRouter)

//Server entry point
app.listen(port, () => console.log(`Server is running on port ${port}`))