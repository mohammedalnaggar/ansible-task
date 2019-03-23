#!/usr/bin/env node
var nodemailer = require('nodemailer');
function send_mail(email,subject,message){
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'nahm.reads@gmail.com',
           pass: 'nahm1234'
       }
   });

   const mailOptions = {
    from: 'nahm.reads@gmail.com', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: message
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });}
 module.exports=send_mail