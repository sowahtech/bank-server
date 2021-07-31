// importing packages
const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
//importing controllers
let {createBanksController,
     viewBankController, 
     updateBankController, 
     deleteBankController, 
     createAccountController, 
     listAccountsController} = require('./controllers');

//creating express server instance
const server = express();

//middleware
server.use(express.json());

//routes

//create bank
server.post('/bank', createBanksController);
//view banks
server.get('/bank/:id?', viewBankController);
//update banks
server.put('/bank', updateBankController);
//delete banks
server.delete('/bank', deleteBankController);

server.post('/account', createAccountController);

server.get('/accounts', listAccountsController)

//connecting to database and starting server
mongoose.connect("mongodb+srv://salis:salis01@cluster0.wu29m.mongodb.net/banksServerDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
.then(result =>{
    server.listen(3000, ()=> console.log('server is ready'))
}).catch(err => console.log(err));
