const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');
const normalize = require('normalize-url');

require('../../model/Users')
const Users = mongoose.model('user');

/*
    method: POST
    visibility: public
    response: token for autherization
*/
router.post('/auth/register', [
    check('name', 'Name is required').isString(),
    check('role', 'Role is required').isString(),
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

    const avatar = normalize(gravatar.url(req.body.email, { s: "200", d: "mm", r: "pg" }), { forceHttps: true });

    await new Users.save({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: req.body.role,
        avatar: avatar,
    })


    console.log(req.body);
    return res.json({payload: req.body})
})

module.exports = router;