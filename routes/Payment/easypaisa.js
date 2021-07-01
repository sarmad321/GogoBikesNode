const express = require("express");
const router = express();
const Joi = require("joi");
const {EasyPaisa} = require("../../models/easypaisa");


router.post('/' , async (req , res) => {
    const easypaisa = new EasyPaisa({
        ResponseCode : req.body.ResponseCode,
        ResponseMessage : req.body.ResponseMessage,
        User : req.body.User , 
        Timestamp : req.body.Timestamp
    })

    res.send(easypaisa.save())
})

module.exports = router;