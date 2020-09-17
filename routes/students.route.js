const router = require('express').Router()
const {studentController} = require('../controllers/student.controller')
const {studentMiddleware} = require('../middlewares/student-validation.middleware')

router.get('/', studentController.getStudents)
router.get('/:id', studentController.findStudent)

router.delete('/delete/:id', studentController.deleteStudent)

router.post('/add', studentMiddleware.validateAddStudent, studentController.addStudent)

router.put('/edit/:id', studentMiddleware.validateEditStudent, studentController.editStudent)

module.exports = router
