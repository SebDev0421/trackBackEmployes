'use strict'

const express = require('express'),
      app = express.Router()


app.get('/',(req,res)=>{
    res.json({response:'Grupo Conexion Colombia Tracking Service'})
})


module.exports = app