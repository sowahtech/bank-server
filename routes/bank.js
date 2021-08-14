const express = require('express');

const {body} = require('express-validator');

const {createBanksController, viewBankController, updateBankController, deleteBankController} = require('../controllers/bank');
const BankModel = require('../models/bank');

const router = express.Router();

//create bank
router.post('/bank', [
    body('name').trim().not().isEmpty().withMessage('name cannot be empty'),
    body('location').trim().not().isEmpty().withMessage('location cannot be empty'),
    body('branch').trim().not().isEmpty().withMessage('branch cannot be empty'),
    body('phone').isMobilePhone('en-GH')
    .custom((value, {req}) =>{
        return BankModel.findOne({'phone': value}).then(
            bankDoc =>{
                if(bankDoc){
                    return Promise.reject('phone number is already taken')
                }
            }
        )
    })
], createBanksController);
//view banks
router.get('/bank/:id?', viewBankController);
//update banks
router.put('/bank', updateBankController);
//delete banks
router.delete('/bank', deleteBankController);

module.exports = router;