const Joi = require('joi');
const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    phone :  String,
    userDetail : {
        type : Object ,
    },
})


const User = mongoose.model('User' , userSchema )


function validateUser(user){
    const schema = Joi.object({ 
        phone  : Joi.string().min(12).required(),
        userDetail : Joi.object(),
    })
   return schema.validate(user)
}

module.exports.Users = User;
module.exports.validate = validateUser;