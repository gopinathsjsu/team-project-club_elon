const mongoose = require('mongoose');

const Schema = require('mongoose').Schema;

const userSchema = new Schema({
    username: {
        type: String
        //required: true
    }
    // age: {
    //     type: Number,
    //     required: true
    // }
}
);

const User = mongoose.model('User',userSchema);
module.exports = User;