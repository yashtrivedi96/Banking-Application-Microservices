const mongoose = require('mongoose');
const User = require('./User');
const Account = require('./Account');
const Transaction = require('./Transaction');
const connectDB = require('./db');


connectDB();

module.exports.hello = async (event, context) => {
  console.log(event);
  console.log(event.Records[0].body);
  const s = event.Records[0].body;
  var s2 = "";
  for(var i=0;i<s.length;i++) {
      if(s[i] == '\\') {
          continue;
      } else {
          s2 += s[i];
      }
      
      
  }
  const res = JSON.parse(s2).MessageBody;
  console.log(res);
  
  
  
  const { email, type, operation } = res;
  let currentBalance = 0;
  
  const amount = parseInt(res.amount);
  try {
        const account = await Account.find({ email: email, type: type });
        console.log(account, email, operation, type);
        currentBalance = parseInt(account[0].balance);
        console.log(currentBalance, account[0].balance);
      
        if ((currentBalance  < amount) && (operation == "debit")) {
          return {statusCode: 400, errors: [{msg: 'Insufficient Balance for the transaction'}]};
        }
        
        var newBalance = "";
        console.log(operation);
        if (operation === 'debit') {
          // console.log("..........")
          // console.log(currentBalance - amount);
            newBalance = (currentBalance - amount).toString();
        }
        if (operation === 'credit') {
          newBalance = (currentBalance + amount).toString();
        }
        console.log(" new Bal ",newBalance);
  } catch(err) {
    console.log(err);
  }
 

  const filter = { email: email, type: type};
  const update = { balance: newBalance };
  const doc = await Account.findOneAndUpdate(filter, update);
  const transaction = new Transaction({
    email: email,
    beforeTransaction: currentBalance,
    afterTransaction: newBalance,
    type: operation,
    change: res.amount
  
  })
  
  await transaction.save();
  const response = {
        statusCode: 200,
        body: JSON.stringify("success!"),
    };
    return response;
  
};
