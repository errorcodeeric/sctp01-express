const express = require('express');
const wax = require('wax-on');
const hbs = require('hbs');
const app = express();

wax.setLayoutPath('./views/layouts');
wax.on(hbs.handlebars);

app.use(express.static("public"));

// set the default view engine to 'hbs'
app.set('view engine', 'hbs');

app.use(express.urlencoded({
    extended: false // use basic forms not advanced forms
}))

// ROUTES BEGIN HERE
app.get('/', function(req,res){
    res.render('index');
})

// We want to add a rout for GET /add-food
app.get("/add-food", function(req,res){
    res.render('add-food');
})

// We want to add a route for POST /add-food
// app.post("/add-food", function(req,res){
//     const foodName = req.body.foodName;
//     const calories = req.body.calories;
//     res.render("food-summary", {
//         foodName: foodName,
//         calories: calories
//     })
// })

app.post("/add-food", function(req,res){

    console.log(req.body);

    // use the destructuring syntax to extract
    // many keys from an object at one go
    const {foodName, calories, meal, cuisine} = req.body;

    // it is possible for NO radio button to selected
    // so we have to check if there is one selected
    if (!meal) {
        res.send("No meal seleced");
        return;
    } 

    res.render("food-summary", {
        foodName,
        calories,
        meal,
        cuisine
    })
});

// One route to send the form HTML back to the client
app.get("/bmi", function(req,res){
    res.render("bmi");
})

app.post("/bmi", function(req,res){
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const bmi = weight / (height/100) ** 2;
    res.render('bmi-result',{
        bmi: bmi
    })
})


app.listen(3000, function(req,res){
    console.log("Server has start");
})