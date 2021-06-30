const express = require("express");
const jwt = require("jsonwebtoken");
const router = express();
const mongoose = require('mongoose');
const Joi = require("joi");
const {Users} = require("../../models/users");
const bcrypt = require("bcrypt");



// Registration Process
router.post('/' ,async (req , res)=> { 
    const schema = Joi.object({ 
        phone  : Joi.number().min(10).required(),
        userDetail : Joi.object(),
    })


    const validation = schema.validate(req.body)

    const alreadyExist = await  Users.findOne({phone : req.body.phone})
    
if (alreadyExist) {
    return res.status(400).send({userExists : true})
}
    

    const register = new Users({
        phone : req.body.phone,
        userDetail : {
            frontCnic : req.body.userDetail.frontCnic,
            backCnic : req.body.userDetail.backCnic,
            selfie : req.body.userDetail.selfie
        }
    })


 

 if(validation.error ) { 
    return  res.status(400).send(validation.error.details[0].message)
 }  

    register.save()
    .then(response => {
        const token = jwt.sign({id : response._id} , "privateKey")
        res.status(200).send({
            status : "user has been registered successfully",
            token : token
        })
    })
    .catch(ex => res.send(ex))

})


module.exports = router;