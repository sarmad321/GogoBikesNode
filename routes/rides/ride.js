const express = require("express");
const jwt = require("jsonwebtoken");
const router = express();
const mongoose = require('mongoose');
const Joi = require("joi");
const {Ride} = require("../../models/ride");
const bcrypt = require("bcrypt");
const auth = require('../../middleware/auth')


router.post('/start' , auth , async(req , res)=> {
     let date = new Date()
     let progress = await Ride.findOne({userDetail : req.user.id , status : "inProgress"})
     if(progress){
          return res.status(400).send({
               status : "Ride already in progress can not start multiple rides."
          })
     }
          const ride = new Ride({
          startTime : date,
          userDetail : req.user.id,
          status : "inProgress"
     })
     
     try{
        await  ride.save()
          res.send({
               rideId : ride._id,
               status : "ride has been successfully started"
          })
     }
     catch{
          res.status(400).send({
               status : "something went wrong"
          })
     }
})

router.post('/end' , auth , async(req , res)=> {
     let date = new Date()
     try{
          let result = await Ride.findOne({userDetail : req.user.id , status : "inProgress"})
          result.status = "completed"
          result.endTime = date
          console.log(result)
          
          let save = await result.save()
          res.send({
               rideId : result._id,
               status : "ride has been successfully ended"
          })
          
     }catch {
          res.status(400).send({
               status : "something went wrong"
          })
     }
    
})


router.post('/reviews' , auth , async(req , res)=> {
     try{
          let result = await Ride.findByIdAndUpdate(req.body.id , {
               $set : {
                    review : req.body.review,
                    rating : req.body.rating
               }
          })
          res.send({
               status : "Sucessfully submitted"
          })
     }
     catch{
          res.send({
               status : "something went wrong"
          })
     }

})

router.get('/status' , auth , async(req , res)=> {
     try{
          let result = await Ride.findOne({userDetail : req.user.id , status : "inProgress"})
 
          if(result){ 
               return res.send({
                    inProgress : true ,
                    id : result._id,
                    startTime : result.startTime,
                    status : result.status
               })
          }
          res.status().send({
               status : "something went wrong"
          })
     }
     catch{
          res.send({
               status : "something went wrong"
          })
     }

})

module.exports = router