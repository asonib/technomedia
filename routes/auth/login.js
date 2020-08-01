const express = require('express')
const router = express.Router()
const passport = require('passport');

// Load User model
const User = require('../../model/Users');

// Login
router.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: res.json({'msg': 'Log In Successful'}),
    failureRedirect: res.json({'msg': 'Insuccessful'})
    })(req, res, next);
});

module.exports = router;