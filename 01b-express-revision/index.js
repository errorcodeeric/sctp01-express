// DEPENDENCIES
const express = require('express');

const app = express();

// ROUTES
app.get("/", function(req, res) {
    // res is the response object
    res.send("Hello World");
})

// `:firstName` is a placeholder (url parameter). The name of the placeholder is `firstName`
// /hello/paul, then it means the `firstName` parameter should contain `paul`
// /hello/alan, then it means the `firstName` parameter should contain `alan`
app.get("/hello/:firstName/:lastName", function(req,res){
    res.send("hello!");
})

// Query Strings
// The parameter for the query string will not be in the route url
app.get("/addTwo", function(req,res){
    const n1 = parseInt(req.query.n1); // we expect keys in the query string to be `n1` and `n2` respectively
    const n2 = parseInt(req.query.n2);
    const sum = n1 + n2;
    res.send("Sum =" + sum);
})

app.get("/about-us", function(req,res){
    res.send("About Us");
})

// START SERVER
app.listen(3000, function(){
    console.log("Server has started");
})
