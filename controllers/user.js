const UserModel = require('../models/user');

const {validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');

const signupController = (req, res) => {
    //check for errors
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		console.log(errors);
		res.json({message: errors.array()[0].msg})
	}

    const {name, email, password} = req.body;

    bcrypt.hash(password, 7).then(harshedPassword =>{

        const user = new UserModel({name, email, password: harshedPassword});

        user.save().then(user =>{
            res.json({"messagae":"signup successful", "data": {name: user.name, email: user.email}})
        }).catch(err => console.log(err))

    }).catch(err => console.log(err))

    
}

const signinController = async (req, res) => {

    try {
        //check for errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({message: errors.array()[0].msg})
        }

        const {email, password} = req.body;

        //find user in database

        const user = await UserModel.findOne({email});

        if(!user){
            return res.json({message: "user not found"}); 
        }

        //compare passwords
        const isAuth = await bcrypt.compare(password, user.password);

        if(!isAuth){
            return res.json({message: "email and password combination is incorrect"})
        }

        return res.json({message: 'user signed in correctly'});
        
    } catch (error) {

        res.json({message: "server error. pls try again"})
        
    }


}

module.exports = {
    signupController,
    signinController
}


