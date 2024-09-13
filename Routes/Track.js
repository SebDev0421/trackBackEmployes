'use strict'

//Track data service

//models
const Track = require('../Models/Track')

const express = require('express'),
      app = express.Router()

app.get('/',(req,res)=>{
    res.json({response:'Grupo Conexion Colombia Tracking Service'})
})

app.post('/write',(req,res)=>{
    //const {user_id,time,pos}=req.body
    const {userId,location,Battery}=req.body
    
    const dateTime = new Date
    const track = new Track({userId,dateTime,location,Battery})
    track.save()
    if(Battery<15){
        res.json({status:3,message:"data was saved but battery device[low]"})   
    }else{
        res.json({status:2,message:"data was saved"})
    }
})

app.get('/readUserRegister',(req,res)=>{
    // search by date and user Ids
    //const {user_id,time,pos}=req.body
    const objData=req.body
    const userId = objData.userId
    const dateTime = objData.dateTime

    const dateTimeRangeData = new Date(dateTime)
    console.log(dateTimeRangeData)
    
    
    Track.find({userId:userId}).then((data)=>{
        console.log(data)
    })
    
    res.json(objData)
})

module.exports = app