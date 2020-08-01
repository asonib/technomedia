const express = require('express')
const router = express.Router()

router.get('/auth/register', (req, res) => {
    res.send('Register')
})

module.exports = router;