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
    const {foodName, calories, meal, cuisine, tags} = req.body;

    // it is possible for NO radio button to selected
    // so we have to check if there is one selected
    if (!meal) {
        res.send("No meal seleced");
        return;
    } 

    // tags could be one of these three:
    //  an array (if more than one selected) => array (no changes)
    //  a string (if only one selected) => array of one item (the string itself)
    //  undefined (if none of them selected) => empty array

    // let selectedTags = [];
    // if (Array.isArray(tags)) {
    //     selectedTags = tags;
    // } else if (!tags) {
    //     selectedTags = [];
    // } else {
    //     selectedTags = [ tags ];
    // }

    let selectedTags = []; // assume no checkboxes is checked
    // if at least one checkbox is checked
    if (tags) {
         selectedTags = Array.isArray(tags) ? tags : [tags];
    }

    // selectedTags = tags ?  Array.isArray(tags) ? tags : [tags]  : [];

    res.render("food-summary", {
        foodName,
        calories,
        meal,
        cuisine,
        selectedTags
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

app.get('/maths', function(req,res){
    res.render('math');
})

app.post('/maths', function(req,res){
    // long form
    // const num1 = req.body.num1;
    // const num2 = req.body.num2;
    // const operator = req.body.operator;

    // if short form
    let {num1, num2, operator} = req.body;
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    if (!operator) {
        res.send("No operator selected");
        return; // end the function
    }

    let result = 0;
    if (operator == "add") {
        result = num1 + num2;
    } else if (operator == "divide") {
        result = num1 / num2;
    } else if (operator == "subtract") {
        result = num1 - num2;
    } else {
        result = num1 * num2;
    }
    res.send("Result = " + result);

})

app.get('/fruits', function(req,res){
    res.render('fruits');
})

app.post("/fruits", function(req,res){
    // three possible cases:
    // 1. undefined (==> empty array)
    // 2. one single string (==> array with one string)
    // 3. an array (==> keep the same)
    const items = req.body.items;
    let selectedItems = [];
    
    if (items) {
        selectedItems = Array.isArray(items) ? items : [ items];
    }

    const fruitPricings = {
        "apple":3,
        "orange": 6,
        "banana": 4,
        "durian": 15
    }

    let total = 0;
    // for (let item of selectedItems) {
    //     if (item=="durian") {
    //         total += 15;
    //     } else if (item=="apple") {
    //         total += 3;
    //     } else if (item=="orange") {
    //         total += 6;
    //     } else if (item=="banana") {
    //         total +=4;
    //     }
    // }

    for (let item of selectedItems) {
        if (fruitsPricing[item]) {
            total += fruitPricings[item];
        }
      
    }

    console.log(selectedItems);

    res.send("Total cost =" + total);
})

app.listen(3000, function(req,res){
    console.log("Server has start");
})