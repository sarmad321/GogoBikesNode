const Joi = require('joi');
const mongoose = require('mongoose');



const rideSchema = new mongoose.Schema({
    startTime : Date,
    endTime : Date,
    userDetail :  {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'User'
    },
    rating : Number,
    review : String,
    status : String,

    
})


const Ride = mongoose.model('ride' , rideSchema )


function validateRide(user){
    const schema = Joi.object({ 
        startTime  : Joi.string().min(12).required(),
        endTime : Joi.object(),
    })
   return schema.validate(user)
}

module.exports.Ride = Ride;
module.exports.validate = validateRide;