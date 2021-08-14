const express = require('express');

const {body} = require('express-validator');

const accountModel = require('../models/accounts')

const {createAccountController, listAccountsController} = require('../controllers/accounts');

const router = express.Router();

router.post('/account',[
    body('name').trim().not().isEmpty().withMessage('name cannot be empty'),
    body('number').trim().not().isEmpty().isNumeric().isLength({min: 10})
    .custom((value, {req}) =>{
        return accountModel.findOne({'number': value}).then(
            bankDoc =>{
                if(bankDoc){
                    return Promise.reject('account number already exists')
                }
            }
        )
    }),
    body('accountType').trim().not().isEmpty().isAlpha().withMessage('account type should be letters only'),
    body('bankId').trim().not().isEmpty().isAlphanumeric().isLength({min: 24}).withMessage('bankId must be at least 24 characters long')    
], createAccountController);

router.get('/accounts', listAccountsController);

module.exports = router;