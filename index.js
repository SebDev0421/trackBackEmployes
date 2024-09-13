'use strict'

const { mongo } = require('mongoose')



//packages
const express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      port = (process.env.PORT || 8000),
      mongoose = require('./DataBase'),
      morgan = require('morgan'),
      RoutesTrack = require('./Routes/Track'),
      RoutesUsers = require('./Routes/Users'),
      RoutesLogData = require('./Routes/LogData'),
      RoutesClients = require('./Routes/Clients')


//Settings
app.set('port',port)

//middlewares

app.use(express.urlencoded({extended:false}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(morgan('tiny'));

app.use(express.json())

app.use('/track',RoutesTrack)//GPS and batery register users
app.use('/user',RoutesUsers)// users information and credentials
app.use('/logData',RoutesLogData)// when init journey and finish // entry client adn finish client service
app.use('/Clients',RoutesClients)// consult client information


app.listen(app.get('port'), function(){
  console.log("My https server listening on port " + app.get('port') + "...");
});