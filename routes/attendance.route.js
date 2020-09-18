const router = require('express').Router()
const {attendanceController} = require('../controllers/attendance.controller')

router.get('/', attendanceController.getAttendances)

router.post('/add', attendanceController.createBlankList)

router.post('/addstudent', attendanceController.addStudentToCurrentList)

module.exports = router