// importing packages
const express = require('express');
//const bodyParser = require('body-parser');
//importing controllers
let {createBanksController,viewBankController,updateBankController,deleteBankController} = require('./controllers');

//creating express server instance
const server = express();

//middleware
server.use(express.json());

//routes

//create bank
server.post('/bank', createBanksController);
//view banks
server.get('/bank', viewBankController);
//update banks
server.put('/bank', updateBankController);
//delete banks
server.delete('/bank', deleteBankController);

//starting server
server.listen(3000, ()=> console.log('server is ready'))