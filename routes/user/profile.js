const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

router.get('/user/profile', auth, (req, res) => {
    
})

module.exports = router