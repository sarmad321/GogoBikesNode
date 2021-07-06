const express = require("express");
const router = express();
const {Users} = require("../../models/users");
const auth = require('../../middleware/auth')
const {Refferal} = require('../../models/refferal');
const {generateRefferal} = require('../../commonFunction/generateRefferal')

//Getting the Refferal Code and creates if not exists..
router.get('/' , auth , async (req , res)=> {
    try{
        const refferalCode = await generateRefferal(req.user.id)
        let result = await Refferal.findOne({userId : req.user.id})
        if(!result) {
            let obj = new Refferal({
                userId : req.user.id ,
                refferalCode : refferalCode
            })
            let save = await obj.save()
            return res.status(200).send({
                refferalCode : "www.randomweb.com/?ref="+refferalCode
            })
        }

        // result.refferalCode = refferalCode

        res.send({
            refferalCode : "www.randomweb.com/?ref="+result.refferalCode
        })


    }
    catch(ex){
    res.status(400).send({
        status : ex
    })
    }
})


// Posting The Refferal Code..
router.post('/' , auth , async(req , res)=>{
    try
    { 
        const user = await Users.findById(req.user.id).select('phone')
        const refferedBy = await Refferal.findOne({refferalCode : req.body.refferalCode})
        let alreadyExist = await refferedBy.refferedUsers.find(item => item == user.phone)

        if(alreadyExist){
            return res.status(400).send("bad request")
        }
        
        refferedBy.refferedUsers.push(user.phone)
        let result = await refferedBy.save()
        res.send(result)
    }
    catch
    {
            res.status(400).send("Something went wrong")
    }
})

module.exports = router