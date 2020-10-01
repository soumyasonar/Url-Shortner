const express = require('express')
const router = express.Router()
const urlController = require('../app/controller/urlController')

router.get('/urls',urlController.list)
router.post('/urls',urlController.create)
router.get('/urls/:id',urlController.show)
router.put('/urls/:id',urlController.update)
router.delete('/urls/:id',urlController.destory)

//redirect router
router.get('/:hash',urlController.redirect)



module.exports = router