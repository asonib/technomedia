const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    public_key: {
        type: String,
        required: true
    },
    private_key: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('user', UserSchema);