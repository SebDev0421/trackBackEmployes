'use strict'

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      UserSchema = new Schema({
          name:"String",
          roll:Number,
          email:"String",
          password:"String",
          phone:"String",
          auth:Boolean,
          photo:"String"
      },{
          collection:"users"
      }),
UsersModel = mongoose.model("Users",UserSchema)

module.exports = UsersModel