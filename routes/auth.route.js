const router = require('express').Router()
const {authController} = require('../controllers/auth.controller')
const {authMiddleware} = require('../middlewares/auth-validation.middleware')

router.post('/login', authMiddleware.validateLogin, authController.login)
router.post('/register', authMiddleware.validateRegister, authController.register)

module.exports = router