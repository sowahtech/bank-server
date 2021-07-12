//import database
const mongoose = require('mongoose');

// banks model
const BankSchema = new mongoose.Schema({
    name: String,
    location: String,
    branch: String,
    phone: String,
    address: String,
    accountNumber: String
});

const BankModel = mongoose.model('Bank', BankSchema);

module.exports = BankModel;