//import bankModel
let BankModel = require('./model');
//bank controllers
//create banks controller
const createBanksController = (req, res) => {
    let {name,location,branch,phone,address,accountNumber} = req.body;

    let bank = new BankModel({name,location,branch,phone,address,accountNumber});

    bank.save().then(result => {
        res.json({message: 'create successful', data: result});
    }).catch(error => console.log(error));

    
}
//create banks controller
const viewBankController = (req, res) => {
    const {id} = req.params;

    if (id){
        BankModel.find({_id: id}).then(results =>{
            res.json({data: results});
        }).catch(err => console.log(error));
    }else{
        BankModel.find().then(results =>{
            res.json({data: results});
        }).catch(err => console.log(error));
    }
    
    
}
//create banks controller
/* const updateBankController = (req, res) => {
    let {name,location,branch,phone,address,accountNumber} = req.body;

    let updatedBank = BankModel.update({name,location,branch,phone,address,accountNumber});

    res.json({message: 'bank updated successfully', data:updatedBank});

} */
//create banks controller
/* const deleteBankController = (req, res) => {

    const {name} =req.body;

    const deletedBank = BankModel.delete({name});

    res.json({message: 'bank deleted successfully', data:deletedBank})

} */

module.exports = {
    createBanksController,
    viewBankController,
    //updateBankController,
    //deleteBankController
}