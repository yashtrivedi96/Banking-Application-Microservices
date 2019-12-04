const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
   email: {
       type: String,
       required: true
   },
    beforeTransaction: {
       type: String
    },
    afterTransaction: {
       type: String
    },
    transactionType: {
       type: String
    },
    amountChanged: {
       type: String
    }
},
    { collection: 'transaction_details'});

module.exports = mongoose.model('Search', searchSchema);