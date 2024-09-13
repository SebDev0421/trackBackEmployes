'use strict'

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      TrackSchema = new Schema({
          userId:String,
          dateTime:Date,
          location:[],
          Battery:Number
      },{
          collection:"track"
      }),
TrackModel = mongoose.model("Track",TrackSchema)

module.exports = TrackModel