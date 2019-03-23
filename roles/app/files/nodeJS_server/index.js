#! /usr/bin/env node

const PORT = process.env.PORT || 5000;
const express = require('express');
const bodyParser= require('body-parser')
require('./connection/DBconnector')

const app = express();

const categoriesRouter = require('./routes/categoriesRouter')
const usersRouter = require('./routes/usersRouter')
const adminRouter = require('./routes/adminRouter')
const authorsRouter = require('./routes/authorsRouter')
const booksRouter = require('./routes/booksRouter')
const homeRouter = require('./routes/homeRouter')
const photoRouter = require('./routes/photoRouter')
// const adminModel = require('./models/adminModel')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
// let new_uadmin = {
//     email: "mahmoudalaa25492@gmail.com",
//     password: "12345678"
// }
// adminModel.create(new_uadmin,(err,data)=>{
// console.log(err)
// })
// allow client to recive ajax requests
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers", "user_id")
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token");

    // res.header("Access-Control-Allow-Headers", "access_token")
    next();
});

///////////////////////////////////////
// photo route handler
app.use('/photo', photoRouter)
// users route handler
app.use('/users', usersRouter)
// admin route handler
app.use('/admin', adminRouter)

//////   // AUTH  \\    ////////

// const  ProtectedRoutes = express.Router(); 

// app.use('/auth', ProtectedRoutes);

// ProtectedRoutes.use((req, res, next) =>{
//     // check header for the token
//     var token = req.headers['access-token'];
//     // decode token
//     if (token) {
//       // verifies secret and checks if the token is expired
//       jwt.verify(token, "naggarsecret", (err, decoded) =>{      
//         if (err) {
//           return res.json({ message: 'invalid token' });    
//         } else {
//           // if everything is good, save to request for use in other routes
//           console.log(decoded)
//           req.decoded = decoded;  
//           // will route him to the next route handler with the decoded token attached
//           next();
//         }
//       });

//     } else {
//       // if there is no token  
//       res.send({ 
//           hamani: 'no toke',
//           message: 'No token provided.' 
//       });
//     }
//   });


// authors route handler
app.use('/authors', authorsRouter)
// categories route handler
app.use('/categories', categoriesRouter)


// books route handler
app.use('/books', booksRouter)
// home route handler
app.use('/home', homeRouter)

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Listening on port: ${PORT}`)
})
