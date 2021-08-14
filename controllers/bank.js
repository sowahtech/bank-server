const BankModel = require('../models/bank')

const {validationResult} = require('express-validator');

const AccountModel = require('../models/accounts')
//bank controllers
//create banks controller
const createBanksController = (req, res) => {

	//check for errors
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		console.log(errors);
		res.json({message: errors.array()[0].msg})
	}
    let { name, location, branch, phone, address, accountNumber } = req.body;
  
    let bank = new BankModel({
      name,
      location,
      branch,
      phone,
      address,
      accountNumber,
    });
  
    bank
      .save()
      .then((result) => {
        res.json({ message: "create successful", data: result });
      })
      .catch((error) => console.log(error));
  };
  //create banks controller
  const viewBankController = (req, res) => {
    const { id } = req.params;
  
    if (id) {
      BankModel.find({ _id: id })
        .then((results) => {
          res.json({ data: results });
        })
        .catch((err) => console.log(error));
    } else {
      BankModel.find()
        .then((results) => {
          res.json({ data: results });
        })
        .catch((err) => console.log(error));
    }
  };
  //create banks controller
  const updateBankController = (req, res) => {
    let { id, name, location, branch, phone, address, accountNumber } = req.body;
  
    BankModel.findById(id)
      .then((bank) => {
        if (bank) {
          bank.name = name;
          bank.location = location;
          bank.branch = branch;
          bank.phone = phone;
          bank.address = address;
          bank.accountNumber = accountNumber;
          bank.save();
          res.json({ message: "update succcessful", data: bank });
        }
        res.json({ message: "document cannot be found" });
      })
      .catch((error) => console.log(error));
  };
  //create banks controller
  const deleteBankController = (req, res) => {
    const { id } = req.body;
  
    BankModel.findByIdAndRemove(id).then((deletedBank) => {
      if (deletedBank) {
        accountModel.deleteMany({bankId: deletedBank._id}).then((result) =>{
          res.json({ message: "bank deleted successfully", data: deletedBank });
        })  
        
        return;
      }
  
      res.json({ message: "bank not found" });
    });
  };

  module.exports = {
    createBanksController,
    viewBankController,
    updateBankController,
    deleteBankController
  }