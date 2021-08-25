const express = require('express');

const {signupController, signinController} = require('../controllers/user')

const UserModel = require('../models/user')

const {body} = require('express-validator');

const router = express.Router();

router.put('/signup',[
    body('name').trim().not().isEmpty().withMessage('User name is required'),
    body('email')
    .isEmail()
    .withMessage('email is invalid')
    .custom((value, {req}) =>{
        return UserModel.findOne({"email": value}).then(UserDoc => {
            if(UserDoc)
                return Promise.reject('email already taken')
        })

    }),
    body('password').trim().isLength({min: 5})
],signupController);

router.post('/signin',[
    body('email')
        .isEmail()
        .withMessage('email is invalid'),
    body('password').trim().isLength({min: 5})

],signinController);

module.exports = router;