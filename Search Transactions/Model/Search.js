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
    type: {
       type: String
    },
    change: {
       type: String
    },
    date: {
       type: Date,
        default: Date.now
    }
},
    { collection: 'transactions'});

module.exports = mongoose.model('Search', searchSchema);