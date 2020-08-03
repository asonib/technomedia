const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const jwt = require('jsonwebtoken')
require('dotenv').config()

require('../../models/Users')
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
    const user = await Users.findOne({email: req.body.email})
    if(user){
        return res.json({errors: [{'msg': 'Email Already Exist'}]})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const avatar = normalize(gravatar.url(req.body.email, { s: "200", d: "mm", r: "pg" }), { forceHttps: true });

    const new_user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: req.body.role,
        avatar: avatar,
    })
    await new_user.save()
    try {
        const payload = {
            id: new_user._id
        }
        jwt.sign(payload, process.env.JWT_SECRETKEY, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token: token });
        });
    } catch (err) {
        return res.json({errors: [{'msg': 'error getting user'}]})
    }
})

module.exports = router;