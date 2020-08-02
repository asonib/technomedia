const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

router.get('/user/dashboard', auth, (req, res) => {
    res.send('Profiles')
})

module.exports = router