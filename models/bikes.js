const Joi = require('joi');
const mongoose = require('mongoose');


const bikesSchema = new mongoose.Schema({
    modelNo : String,
    bikeNo : String,
    longitude : Number,
    latidude : Number,
 
})

const Bikes = mongoose.model('bikes' , bikesSchema )

module.exports.bikes = Bikes