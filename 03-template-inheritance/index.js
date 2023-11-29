const express = require('express');
const hbs = require("hbs"); // to configure hbs to use wax-on
const wax = require('wax-on'); // wax-on is for template inheritance
 
const app= express();

// configure wax-on for template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");  // a layout is a template that other hbs can inherit from

// use HBS for templates
app.set("view engine", "hbs");

app.get("/", function(req,res){
    res.render("index");
})

app.get("/about-us", function(req,res){
    res.render("about");
});

app.get("/contact-us", function(req,res){
    res.render("contact");
})

app.listen(3000, function(){
    console.log("Server has started")
})