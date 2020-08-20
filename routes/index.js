const router = require('express').Router()

router.use('/api', require('./apiRoutes.js'))
router.use('/', require('./htmlroutes.js'))

module.exports = router