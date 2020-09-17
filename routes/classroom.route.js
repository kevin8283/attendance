const router = require('express').Router()
const {classroomController} =  require('../controllers/classroom.controller')

router.get('/', classroomController.getClassrooms)
router.get('/:id', classroomController.findClassroom)

router.post('/add', classroomController.createClassroom)

router.put('edit/:id', classroomController.editClassroom)
router.put('/addstudent/:id', classroomController.addStudentToClassroom)

router.delete('/delete/:id', classroomController.deleteClassroom)

module.exports = router