const Joi = require('joi');
const mongoose = require('mongoose');



const paymentSchema = new mongoose.Schema({
    ResponseCode :  String,
    ResponseMessage :String,
    User : String,
    TimeStamp : String
})


const EasyPaisa = mongoose.model('EasyPaisa' , paymentSchema )


function validateUser(user){
    const schema = Joi.object({ 
        phone  : Joi.string().min(12).required(),
        userDetail : Joi.object(),
    })
   return schema.validate(user)
}

module.exports.EasyPaisa = EasyPaisa;
module.exports.validate = validateUser;