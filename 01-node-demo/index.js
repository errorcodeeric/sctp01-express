const express = require('express');
const app = express();  // express function will return a new instance Express

// setup some routes
app.get("/", function(req,res){
    res.send("<h1>hello world</h1>");
})

app.get("/about-us", function(req,res){
    // `res` stands for response
    res.send("About Us");
})

app.get("/lucky-number", function(req,res){
    res.send("<h1>Your lucky number is " + parseInt(Math.random() * 1000 + 999)+"</h1>");
})

// starts the server
app.listen(8000, function(){
 console.log("Server has started")
});
