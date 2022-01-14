const {
    JsonWebTokenError
} = require('jsonwebtoken');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },

    createdAt: {
        type: Date,
        default: Date.now

    },
    wordPerDay: {
        type: Number,
        default: 0
    }



});
//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};
module.exports = mongoose.model('User', UserSchema);