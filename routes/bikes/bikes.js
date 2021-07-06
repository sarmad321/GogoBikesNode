const express = require("express");
const router = express();
const {bikes} = require("../../models/bikes");
const auth = require('../../middleware/auth');

router.post('/', auth  , async (req , res)=> {
    try
    {
        let bike = new bikes({
            modelNo : req.body.modelNo,
            bikeNo : req.body.bikeNo,
            longitude : req.body.longitude,
            latidude : req.body.latidude,
        })

        let result = await bike.save()
        res.send(result)
    }
    catch
    {
        res.status(400).send("Something went wrong")
    }
})

router.get('/' , auth , async (req , res)=> {
        try
        {
            let listofBikes = await bikes.find()
            .select('-_id')
            res.send(listofBikes)
        }
        catch
        {
                return null
        }
})

module.exports = router