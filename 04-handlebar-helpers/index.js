const express = require('express');
const wax = require('wax-on');
const hbs = require('hbs');
const app = express();

wax.setLayoutPath('./views/layouts');
wax.on(hbs.handlebars);

app.use(express.static("public"));

// set the default view eninge to 'hbs'
app.set('view engine', 'hbs');

// custom hbs helper to compare two values
// 1st parameter: the name of the helper (how we will refer to it inside the .hbs)
hbs.handlebars.registerHelper("ifEquals", 
    function(arg1, arg2, options){
        if (arg1 == arg2) {
            // the `this` refers to the hbs
           return options.fn(this);
        } else {
         return options.inverse(this);
        }

})

app.get('/', function(req,res){
    const menu = ["Pizza", "Tomato Meatball Pasta", "Mushroom Soup"];
    const promotion = false;
    const special = "Banana Pie";
    res.render('index', {
        foodMenu: menu,
        promotion: promotion,
        special: special
    });
})


app.listen(3000, function(req,res){
    console.log("Server has start");
})