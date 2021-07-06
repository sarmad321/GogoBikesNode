const Joi = require('joi');
const mongoose = require('mongoose');


const refferalSchema = new mongoose.Schema({
    userId :  {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'User'
    },
    refferalCode : String,
    refferedUsers :  Array
})

const Reffer = mongoose.model('refferal' , refferalSchema )


module.exports.Refferal = Reffer