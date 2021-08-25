//import database
const mongoose = require('mongoose');

//import mongoose schema
const Schema = mongoose.Schema;

// banks model
const UserSchema = new Schema({
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
    accounts: [
        {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Account'
        }
    }
]
});

module.exports = mongoose.model('User', UserSchema);