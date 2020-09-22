const router = require('express').Router()
const {attendanceController} = require('../controllers/attendance.controller')
const {attendanceMiddleware} = require('../middlewares/attendance-validation.middleware')
const {tokenMiddleware} = require('../middlewares/token.middleware')

router.get('/', tokenMiddleware.checkToken, attendanceController.getAttendances)

router.post('/add', tokenMiddleware.checkToken, attendanceMiddleware.validateCreateBlankList, attendanceController.createBlankList)

module.exports = router