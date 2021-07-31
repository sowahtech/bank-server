//import bankModel
const accountModel = require("./accountModel");
let BankModel = require("./model");
//bank controllers
//create banks controller
const createBanksController = (req, res) => {
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

const createAccountController = (req, res) => {
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
  createBanksController,
  viewBankController,
  updateBankController,
  deleteBankController,
  createAccountController,
  listAccountsController,
};
