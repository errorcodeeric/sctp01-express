const express = require('express');
const wax = require('wax-on');
const hbs = require('hbs');
const app = express();

wax.setLayoutPath('./views/layouts');
wax.on(hbs.handlebars);

app.use(express.static("public"));

// set the default view eninge to 'hbs'
app.set('view engine', 'hbs');

app.get('/', function(req,res){
    res.render('index');
})


app.listen(3000, function(req,res){
    console.log("Server has start");
})