'use strict'

const express = require('express'),
      app = express.Router()

const nodemailer = require('nodemailer');
const path = require('path');

const Users = require('../Models/Users')

// HTML content
const contentSend = (userConfirmation,emailConfirmation) =>{
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Usuario</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Poppins', sans-serif;
                background-color: #f0f2f5;
                margin: 0;
                padding: 0;
                text-align: center;
            }
            .confirmation-container {
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #28a745;
            }
            p {
                color: #555;
            }
            .btn {
                display: inline-block;
                padding: 12px 25px;
                background-color: #28a745;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>
        <div class="confirmation-container">
            <img src="https://img.icons8.com/color/96/000000/checked--v1.png" alt="Confirmación Exitosa">
            <h1>¡Confirmación Grupo Conexion Colombia!</h1>
            <p>Deseas confirmar al usuario `+userConfirmation+`.</p>
            <a href="http://localhost:8000/user/confirmation?email=`+emailConfirmation+`&auth=1" class="btn">Confirmar</a>
            <a href="http://localhost:8000/user/confirmation?email=`+emailConfirmation+`&auth=0" class="btn">Rechazar</a>
        </div>
    </body>
    </html>
    `;

    return htmlContent;
}


const sendEmailConfirmation = (client,email,name)=>{
    let Transport = nodemailer.createTransport({
        service: "Gmail",
        port:465,
        auth: {
            user:"correopruebaclasesud@gmail.com",
            pass:"pzpisvwkusurpkcs"
        }
    });

    let mailOptions;
    let sender = "Grupo Conexion Colombia App";
    mailOptions={
        from:sender,
        to:client,
        subject:"Confirmacion Usuario",
        html:contentSend(name,email)
    }

    Transport.sendMail(mailOptions,function(err,response){
        if(err){
            console.log(err)
        }else{
            console.log("Message sent")
        }
    })
}


app.get('/',(req,res)=>{
    res.json({response:'Grupo Conexion Colombia Tracking Service'})
})

app.post('/register',(req,res)=>{
    const {name,roll,email,password,phone} = req.body
    //roll 1 is user and 0 is admin
    console.log(req.body)

    const users = new Users({name:name,roll:roll,email:email,password:password,phone:phone,auth:0,photo:""});
    users.save();

    sendEmailConfirmation("juanse0421@gmail.com",email,name)

    //send email
    res.json({data:"was send"})

})


app.get('/confirmation',async (req,res)=>{
    const auth = req.query.auth
    const email = req.query.email
    const filter = {email:email}

    console.log(auth)
    if (auth == 1){
        
        const update = {auth:auth}
        await Users.findOneAndUpdate(filter,update);
        res.json({response:"ok user was accept"});    
    }else{
        await Users.findOneAndDelete(filter)
        res.json({response:"user was reject"});
    }
})


app.post('/login',async(req,res)=>{
    const {email,password} = req.body

    await Users.findOne({email:email,password:password}).then((data)=>{
        if(data==null){
            res.status(401).json({message:"Usuario no encontrado"})
        }else{
            if(data.auth == 1){
                res.status(200).json({
                    user:{
                        id:data._id,
                        name:data.name,
                        roll:data.roll,
                        email:data.email,
                        phone:data.phone,
                        photo:data.photo
                    },
                    token:"string token"
                })
            }else{
                res.status(401).json({message:"Usuario no aceptado"})
            }
        }
    })
})


app.get('/photo',(req,res)=>{
    res.sendFile(path.join(__dirname,'../Photos/kevin.jpg'))
})


app.get('/consult',(req,res)=>{
    const objData = req.body
    res.json(objData)
})


module.exports = app