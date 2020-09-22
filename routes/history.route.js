const router = require('express').Router()
const { historyController } = require('../controllers/history.controller')
const { tokenMiddleware } = require('../middlewares/token.middleware')


router.get('/', tokenMiddleware.checkToken, historyController.getHistory)

module.exports = router