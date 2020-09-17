const router = require('express').Router()
const {courseController} = require('../controllers/course.controller')
const {courseMiddleware} = require('../middlewares/course-validation.middleware')

router.get('/', courseController.getCourses)
router.get('/:id', courseController.findCourse)

router.post('/add', courseMiddleware.validateAddCourse, courseController.addCourse)

router.put('/edit/:id', courseMiddleware.validateEditCourse, courseController.updateCourse)

router.delete('/delete/:id', courseController.deleteCourse)

module.exports = router