const router = require('express').Router()
const {attendanceController} = require('../controllers/attendance.controller')
const {attendanceMiddleware} = require('../middlewares/attendance-validation.middleware')

router.get('/', attendanceController.getAttendances)

router.post('/add', attendanceMiddleware.validateCreateBlankList, attendanceController.createBlankList)

router.post('/addstudent', attendanceMiddleware.validateAddStudentToList, attendanceController.addStudentToCurrentList)

module.exports = router