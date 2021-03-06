const mongoose = require('mongoose');

const Schema = require('mongoose').Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rewards: {
        type: Number,
    }
}
);

const User = mongoose.model('User',userSchema);
module.exports = User;