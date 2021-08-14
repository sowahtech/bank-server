// importing packages
const express = require('express');
const mongoose = require('mongoose');
const AccountsRoutes = require('./routes/accounts');
const BankRoutes = require('./routes/bank');

//creating express server instance
const server = express();

//middleware
server.use(express.json());

//routes

server.use(AccountsRoutes);
server.use(BankRoutes);




//connecting to database and starting server
mongoose.connect("mongodb+srv://salis:salis01@cluster0.wu29m.mongodb.net/banksServerDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
.then(result =>{
    server.listen(3000, ()=> console.log('server is ready'))
}).catch(err => console.log(err));
