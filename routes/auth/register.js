const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

require('../../model/Users')
const Users = mongoose.model('user');

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
    const user = await Users.findOne({email: req.email})
    if(user){
        return res.json({errors: [{'msg': 'Email Already Exist'}]})
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    return res.json({'msg': hash})


    console.log(req.body);
    return res.json({payload: req.body})
})

module.exports = router;