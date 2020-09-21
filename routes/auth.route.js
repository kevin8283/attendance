const router = require('express').Router()
const {authController} = require('../controllers/auth.controller')
const {authMiddleware} = require('../middlewares/auth-validation.middleware')

router.get('/check', authController.checkIfLoggedIn)

router.post('/login', authMiddleware.validateLogin, authController.login)
router.post('/register', authMiddleware.validateRegister, authController.register)

router.get('/logout', authController.logout)

module.exports = router