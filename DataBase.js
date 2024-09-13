'use strict'

const mongoose = require('mongoose'),
      URI = 'mongodb://localhost/grupoConexionDigital'

mongoose.connect(URI)
        .then(()=>{
            console.log('DB Connect was connect')
        })
        .catch((err)=>{
            if(err) throw err
        })


module.exports = mongoose