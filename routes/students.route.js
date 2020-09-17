const router = require('express').Router()
const {studentController} = require('../controllers/student.controller')

router.get('/', studentController.getStudents)
router.get('/:id', studentController.findStudent)

router.delete('/delete/:id', studentController.deleteStudent)

router.post('/add', studentController.addStudent)

router.put('/edit/:id', studentController.editStudent)

module.exports = router
