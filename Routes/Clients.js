'use strict'

const express = require('express'),
      app = express.Router()


app.get('/',(req,res)=>{
    res.json({response:'Grupo Conexion Colombia Tracking Service'})
})

app.put('/writeNew',(req,res)=>{
    //const {user_id,time,pos}=req.body
    const objData=req.body
    res.json(objData)
})


app.put('/modify',(req,res)=>{
    //const {user_id,time,pos}=req.body
    const objData=req.body
    res.json(objData)
})

app.put('/delete',(req,res)=>{
    //const {user_id,time,pos}=req.body
    const objData=req.body
    res.json(objData)
})

app.get('/search',(req,res)=>{
    //const {user_id,time,pos}=req.body
    const objData=req.body
    res.json(objData)
})


module.exports = app