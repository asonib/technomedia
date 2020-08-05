const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');

const Users = require('../../models/Users');
require('../../models/Chats')
const Chats = mongoose.model('chat')

/*
    method: POST
    visibility: private
    response: posted message
*/
router.post('/forum', [auth,
    check('text', 'Enter something in the forum.').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const new_msg = new Chats({
            user: req.user,
            text: req.body.text
        })
        await new_msg.save()
        return res.json({'post': new_msg})
    } catch (err) {
        console.log('Server Error');
        res.status(400).json(err.message);
    }
})

/*
    method: GET
    visibility: private
    response: get all posted message
*/
router.get('/forum', auth, async(req, res) => {
    let user = await Users.findOne({_id: req.user})
    if(!user){
        return res.json({msg: 'User not authorized to fetch the posts'})
    }
    try {
        const posts = await Chats.find().populate('user', ['name', 'email', 'avatar'])
        if(!posts){
            return res.json({'msg': 'No Posts Found'})
        }
        return res.json({'msg': posts})
    } catch (err) {
        console.log('Server Error');
        res.status(400).json(err.message);
    }
})


/*
    method: DELETE
    visibility: private
    response: delete posted message by post_id
*/
router.delete('/forum/:id', auth, async(req ,res) => {
    try {
        const post = await Chats.findById({_id: req.params.id})
        if(!post){
            return res.json('No Post Found')
        }
        if(post.user.toString() !== req.user){
            return res.status(400).json({msg: 'Not authorized to delete'});
        }
        await post.remove();
        return res.json({msg: 'post deleted'});

    } catch (err) {
        console.log('Server Error');
        res.status(400).json(err.message);
    }
})

module.exports = router;