import express from 'express';
var path = require('path')
var cons = require('consolidate')
var api1 = require('./routes/api1')
//var auth = require('./routes/auth')
var logger = require('morgan')

var bodyParser = require('body-parser')



import firebase from 'firebase'

import 'firebase/auth'
//import initialized firebase app
//import firebaseConfig from './config'

firebase.initializeApp({
     apiKey: "AIzaSyA_t0Gr9vd_6-OVw3P6vZwhNiL4mLYmVZg",
    authDomain: "noshpit-78bdc.firebaseapp.com",
    databaseURL: "https://noshpit-78bdc.firebaseio.com",
    projectId: "noshpit-78bdc",
    storageBucket: "noshpit-78bdc.appspot.com",
    messagingSenderId: "971810847518"

})



var app = express();




/**
*Run different routes and logic here 
*/

//set the view engine and path for views to render
let publicPath =  path.resolve(__dirname, "public");

app.engine('html', cons.swig)
app.set("views", publicPath);
app.set('view engine', 'html');
app.use(express.static(publicPath))


//log requests
app.use(logger("short"))
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//define routes

//app.use('/auth', auth)



localhost:5000/

app.get("/", (req, res) => {
    return res.render('signup')
})


app.get("/home", (req, res) => {
    return res.render('home')
})


app.get("/:username",  (req, res) => {
    console.log(req.param.username)
    return res.render('profile.html')
})


// app.get("/:username", (req, res) => {
//     var username = req.params.username
//     var user = firebase.auth().currentUser
    
// })

app.post("/", (req, res) => {
    const uid = req.body.uid
    console.log(uid)
    if(uid){
        return res.redirect("/")
    }
})


app.use("/api1", api1)









app.listen(3000, () =>{
    console.log("App started on port 3000.")
})