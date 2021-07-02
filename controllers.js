//import bankModel
let BankModel = require('./model');
//bank controllers
//create banks controller
const createBanksController = (req, res) => {
    let {name,location,branch,phone,address,accountNumber} = req.body;

    let bank = new BankModel({name,location,branch,phone,address,accountNumber});

    bank.save();

    res.json({message: 'create successful', data:bank});
}
//create banks controller
const viewBankController = (req, res) => {
    let banks = BankModel.all();
    res.json({data:banks})
}
//create banks controller
const updateBankController = (req, res) => {
    let {name,location,branch,phone,address,accountNumber} = req.body;

    let updatedBank = BankModel.update({name,location,branch,phone,address,accountNumber});

    res.json({message: 'bank updated successfully', data:updatedBank});

}
//create banks controller
const deleteBankController = (req, res) => {

    const {name} =req.body;

    const deletedBank = BankModel.delete({name});

    res.json({message: 'bank deleted successfully', data:deletedBank})

}

module.exports = {
    createBanksController,
    viewBankController,
    updateBankController,
    deleteBankController
}