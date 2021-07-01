const express = require("express");
const jwt = require("jsonwebtoken");
const router = express();
const mongoose = require('mongoose');
const Joi = require("joi");
const {Users} = require("../../models/users");
const bcrypt = require("bcrypt");
const auth = require('../../middleware/auth')


// Registration Process
router.post('/' ,async (req , res)=> { 
    const schema = Joi.object({ 
        phone  : Joi.number().min(10).required(),
    })

    const validation = schema.validate(req.body)

    const alreadyExist = await  Users.findOne({phone : req.body.phone})
    
if (alreadyExist) {
    const token = jwt.sign({id : alreadyExist._id} , "privateKey")
    return res.status(200).send({
        userExist : true,
        token : token
    })
} else {
    return res.status(200).send({
        userExist : false,
    })
}
})


router.get('/'  , auth, async (req , res )=> {

   res.send({
    userExist : true,
   })

}) 


module.exports = router;