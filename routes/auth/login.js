const express = require('express')
const router = express.Router()
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Load User model
const Users = require('../../models/Users');

// Login
router.post('/auth/login', [ 
    check('email', 'Email is required').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Password is required').isString()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = await Users.findOne({email: req.body.email});
    if(!user){
        return res.status(422).json({errors: [{ msg: "No User with Email Exists" }]});
    }
    //Authentication
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if(!isMatch){
        return res.status(422).json({errors: [{ msg: "Invalid Credentials" }]});
    }
    const payload = {
        id: user._id
    }
    jwt.sign(payload, 'AES256_build75', {expiresIn: 360000}, (err, token) => {
        if(err) throw err;
        res.json({ token });
    });
    
});

module.exports = router;