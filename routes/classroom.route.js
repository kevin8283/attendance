const router = require('express').Router()
const {classroomController} =  require('../controllers/classroom.controller')
const {classroomMiddleware} = require('../middlewares/classroom-validation.middleware')

router.get('/', classroomController.getClassrooms)
router.get('/:id', classroomController.findClassroom)

router.post('/add', classroomMiddleware.validateAddClassroom, classroomController.createClassroom)

router.put('edit/:id', classroomMiddleware.validateEditClassroom, classroomController.editClassroom)
router.put('/addstudent/:id', classroomMiddleware.validateAddStudentToClassroom, classroomController.addStudentToClassroom)

router.delete('/delete/:id', classroomController.deleteClassroom)

module.exports = router