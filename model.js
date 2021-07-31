//import database
const mongoose = require('mongoose');

//import mongoose schema
const Schema = mongoose.Schema;

// banks model
const BankSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accounts: [
        {
            accountsId:{
                type: Schema.Types.ObjectId,
                ref: 'Account',
                required: true
            }
        }
    ]
});

const BankModel = mongoose.model('Bank', BankSchema);

module.exports = BankModel;