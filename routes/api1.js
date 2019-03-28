var express = require("express");
var api1 = express.Router();

//routes


api1.get("/", (req, res) =>{

    return res.json({'error': 'blah'})
})



//signs up the user -> signs in -> redirects
api1.get("/signup", (req, res) =>{
    
})


module.exports = api1;

