const router = require('express').Router()
const {attendanceMiddleware} = require('../middlewares/attendance-validation.middleware')
const {attendanceController} = require('../controllers/attendance.controller')

router.post('/', attendanceMiddleware.validateAddStudentToList, attendanceController.addStudentToCurrentList)

module.exports = router