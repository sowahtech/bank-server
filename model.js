//import database
let banksDb = require('./db')
// banks model
class BankModel {
    constructor({name,location,branch,phone,address,accountNumber}){
        this.name = name;
        this.location = location;
        this.branch = branch;
        this.phone = phone;
        this.address = address;
        this.accountNumber = accountNumber;
    }

    save(){
        banksDb.push(this);
        return this;
    }

    static all(){
        return banksDb;
    }

    static update(updatedInfo = {}){
        banksDb = banksDb.map(bank =>{
            if(bank.name === updatedInfo.name){
                return {...bank, ...updatedInfo};
            }
            return bank;
        });
        return banksDb;
    }

    static delete({name}) {
        let deletedBank = null;
        banksDb = banksDb.filter(bank =>{
            if(bank.name !== name){
                return true;
            }
            deletedBank = bank;
            return false;
        });
        return deletedBank;
    }
}

module.exports = BankModel