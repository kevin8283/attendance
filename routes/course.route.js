const router = require('express').Router()
const {courseController} = require('../controllers/course.controller')

router.get('/', courseController.getCourses)
router.get('/:id', courseController.findCourse)

router.post('/add', courseController.addCourse)

router.put('/edit/:id', courseController.updateCourse)

router.delete('/delete/:id', courseController.deleteCourse)

module.exports = router