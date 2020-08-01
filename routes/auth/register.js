const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.post('/auth/register', [
    check('name', 'Name is required').isString(),
    // username must be an email
    check('email', 'Email is required').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Password is required').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    console.log(req.body);
    return res.json({payload: req.body})
})

module.exports = router;