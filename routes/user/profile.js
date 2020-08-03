const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');

require('../../models/Users')
const Users = mongoose.model('user');

router.post('/user/profile', auth, [
    check('department', 'Department Name is required').isString(),
    check('phone', 'Phone Number is required').isString(),
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
    if (phone) profileDetails.company = phone;
    if (website) profileDetails.website = website;
    if (location) profileDetails.location = location;
    if (department) profileDetails.status = department;
    if (skills) profileDetails.skills = skills;
    if (bio) profileDetails.bio = bio;
    if (githubusername) profileDetails.githubusername = githubusername;
    
    profileDetails.social = {}
    if (youtube) profileDetails.social.youtube = youtube;
    if (twitter) profileDetails.social.twitter = twitter;
    if (linkedin) profileDetails.social.linkedin = linkedin;
    if (facebook) profileDetails.social.facebook = facebook;
    if (instagram) profileDetails.social.instagram = instagram;

    
    return res.json(profileDetails)
    try {
        let profile = await Profile.findOne({ user: req.user });
        if (profile) {
            const profile = await (await Profile.findOneAndUpdate({ user: req.user }, { $set: profileDetails }, { new: true }));
            return res.status(200).json(profile);
        }
        profile = new Profile(profileDetails);
        await profile.save();
        return res.status(200).json(profile);
    } catch (err) {
        console.log('Server Error');
        res.status(400).json(err.message);
    }
    
})

module.exports = router