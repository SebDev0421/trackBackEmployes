'use strict'

//Track data service

//models
const Track = require('../Models/Track')
const Users = require('../Models/Users')


const express = require('express'),
      app = express.Router()

app.get('/',(req,res)=>{
    res.json({response:'Grupo Conexion Colombia Tracking Service'})
})

app.post('/write',async(req,res)=>{
    //const {user_id,time,pos}=req.body
    const {userId,location,Battery}=req.body
    //console.log(req.body)
    const dateTime = new Date
    const track = new Track({userId,dateTime,location,Battery})
    await track.save()
    if(Battery<15){
        res.json({status:3,message:"data was saved but battery device[low]"})   
    }else{
        res.json({status:2,message:"data was saved"})
    }
})

app.post('/readUserRegister',(req,res)=>{
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


app.get('/readLastPos',async (req,res)=>{
    // search all last positions
    //const {user_id,time,pos}=req.body
    let bufferApp = []
    await Users.find().then((data)=>{
        //filter roll and name
        data.map(async (userInf)=>{
            if(userInf.roll == 1 && userInf.auth == true){
                
                await Track.find({userId:userInf._id}).sort({dateTime:-1}).limit(1).then((data)=>{
                    if(data[0] != undefined){
                        bufferApp.push({
                            id : userInf._id,
                            name : userInf.name,
                            location:data[0].location,
                            dateTime:data[0].dateTime,
                            battery:data[0].Battery

                        })
                    }
                })
            }
        })

    })

    setTimeout(()=>{
        console.log(bufferApp)
        res.json({listPos:bufferApp})
    }, 200);
    
})

module.exports = app