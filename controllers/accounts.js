//import bankModel
const accountModel = require('../models/accounts');

const {validationResult} = require('express-validator');

const createAccountController = (req, res) => {

  const errors = validationResult(req);
	if(!errors.isEmpty()){
		console.log(errors);
		res.json({message: errors.array()[0].msg})
	}

  const { name, number, accountType, bankId } = req.body;

  const account = new accountModel({ name, number, accountType, bankId });

  account.save().then((result) => {
    if (result)
      res.json({ message: "account created successfully", data: account });
    else res.json({ message: "account could not be created" });
  });
};

const listAccountsController = (req, res) => {
  const { id } = req.body;
  if (id) {
    accountModel
      .findById(id)
      .populate("bankId", "name location branch")
      .then((account) => {
        res.json({ data: account });
      })
      .catch((err) => console.log(err));
  } else {
    accountModel
      .find()
      .populate("bankId", "name location branch")
      .then((accounts) => {
        res.json({ data: accounts });
      })
      .catch((err) => console.log(err));
  }
};

module.exports = {
  createAccountController,
  listAccountsController
};
