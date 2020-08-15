const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');

const Chats = require('../../models/Chats');
require('../../models/Profile')
const Profiles = mongoose.model('profile');
require('../../models/Users')
const Users = mongoose.model('user');

/*
    method: GET
    visibility: private
    response: profile of all registered user - JSON
*/
router.get('/user/all', async(req, res) => {
    try {
        let profiles = await Profiles.find().populate('user', ['name', 'avatar', 'email', 'public_key'])
        return res.json(profiles)
    } catch (err) {
        console.error('Server Error')
        return res.json(res.status(400).json(err.message))
    }    
})
/*
    method: POST
    visibility: private
    response: profile of registered user - JSON
*/
router.post('/user/profile', [auth,
    check('department', 'Department Name is required').not().isEmpty(),
    // password must be at least 5 chars long
    check('phone', 'Phone Number is Required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        phone,
        website,
        location,
        department,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        linkedin,
        facebook,
        instagram
    } = req.body;

    profileDetails={}
    profileDetails.user = req.user;
    if (phone) profileDetails.phone = phone;
    if (website) profileDetails.website = website;
    if (location) profileDetails.location = location;
    if (department) profileDetails.department = department;
    if (skills) profileDetails.skills = skills;
    if (bio) profileDetails.bio = bio;
    if (githubusername) profileDetails.githubusername = githubusername;
    
    profileDetails.social = {}
    if (youtube) profileDetails.social.youtube = youtube;
    if (twitter) profileDetails.social.twitter = twitter;
    if (linkedin) profileDetails.social.linkedin = linkedin;
    if (facebook) profileDetails.social.facebook = facebook;
    if (instagram) profileDetails.social.instagram = instagram;

    try {
        let profile = await Profiles.findOne({ user: req.user });
        if (profile) {
            const profile = await Profiles.findOneAndUpdate({ user: req.user }, { $set: profileDetails }, { new: true }).populate('user', ['name', 'avatar', 'email','public_key']);
            return res.status(200).json(profile);
        }
        profile = new Profiles(profileDetails);
        await profile.save();
        return res.status(200).json(profile);
    } catch (err) {
        console.log('Server Error');
        res.status(400).json(err.message);
    }
    
})

module.exports = router

/*
    method: DELETE
    visibility: private
    response: delete profile of registered user - JSON
*/
router.delete('/user/deleteuser', auth, async (req, res) => {
    
    try{
        let u = await Users.findOne({_id: req.user})
        if(!u){
            return res.json({'msg': 'No User To Delete'})
        }
        if(u._id.toString() !== req.user){
            return res.status(400).json({msg: 'Not authorized to delete'});
        }
        //if user is found delete all profile, user details and all the posts
        const profile = await Profiles.findOneAndRemove({user: req.user})
        const user = await Users.findOneAndRemove({_id: req.user})
        await Chats.remove({user: req.user})

        return res.json({'msg': 'User deleted Successfully!'})
    }catch(err){
        return res.json([{errors: {
            'msg': 'Error Deleting User'
        }}])
    }
})