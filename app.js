//External dependencies
const http = require('http')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const io = require('socket.io')()
const app = express()
const server = http.createServer(app)

//Envs configuration
dotenv.config()

//Project modules
const studentRouter = require('./routes/students.route')
const classroomRouter = require('./routes/classroom.route')
const courseRouter = require('./routes/course.route')
const attendanceRouter = require('./routes/attendance.route')
const authRouter = require('./routes/auth.route')
const scanRouter = require('./routes/scan-card.route')
const { tokenMiddleware } = require('./middlewares/token.middleware')
const { socketMiddleware } = require('./middlewares/socket.middleware')
const { corsMiddleware } = require('./middlewares/cors.middleware')

//Envs variables
const port = process.env.PORT || 5000
const dbURI = process.env.dbURI
const cookie_secret = process.env.COOKIE_SECRET

//Database connection
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(dbURI, options, () => console.log("Connected with database"))

//Middlewares
app.use(corsMiddleware.useCors)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(cookie_secret))

//Routing
app.use('/', authRouter)
app.use('/', scanRouter)
app.use('/students', tokenMiddleware.checkToken, studentRouter)
app.use('/classrooms', tokenMiddleware.checkToken, classroomRouter)
app.use('/courses', tokenMiddleware.checkToken, courseRouter)
app.use('/attendance', tokenMiddleware.checkToken, attendanceRouter)

//Server entry point
server.listen(port, () => console.log(`Server is running on port ${port}`))

//Socket middlewares
io.use(socketMiddleware.checkSocketID)

//Socket.io entry point
io.listen(server)

