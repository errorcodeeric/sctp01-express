// const means never changes - short for constant
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

// creates a new instance of an express application
// the `app` variable shouldn't be changed
const app = express();

// setup the view engine
app.set('view engine', 'hbs');
app.use(express.static('public'));

// enable forms
app.use(express.urlencoded({
    extended: false
}));

// setup wax on so that it will works with hbs
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

// require in 188 handlebar helpers
require('handlebars-helpers')({
  handlebars: hbs.handlebars
});

// ROUTES HERE
let foodRecords = [
    {
        "id": 12345,
        "foodName": "Chicken Rice",
        "calories": 500,
        "meal":"lunch",
        "tags":["organic","less-oil"]
    },
    {
        "id": Math.floor(Math.random() * 10000) +1,
        "foodName": "Boston Clam Chowder",
        "calories": 750,
        "meal": "dinner",
        "tags": ["home-cooked"]
    },
    {
        "id": Math.floor(Math.random() * 10000) +1,
        "foodName": "Tuna Sandwich",
        "calories": 600,
        "meal": "snack",
        "tags": ["gluten-free"]
    }
];


// ROUTES HERE

// known as the index route
// where the `r` is implemented
app.get('/', function(req,res){
    res.render('index', {
        foodRecords: foodRecords
    })
})

app.get('/add-food', function(req,res){
    res.render("add-food");
})

app.post('/add-food', function(req,res){
    // extract data from form and massage them if necessary
    console.log(req.body);
    const {foodName, calories, meal, tags} = req.body;
    let selectedTags = [];
    if (tags) {
        selectedTags = Array.isArray(tags) ? tags : [tags]; 
    };

    // create the new record
    const newFoodRecord = {
        id: Math.floor(Math.random() * 100000 + 1),
        foodName: foodName,
        calories: calories,
        meal: meal,
        tags: tags
    }

    // add to the "database"
    foodRecords.push(newFoodRecord);
    
    // inform the browser (i.e the client) to go a new URL
    res.redirect("/");

})


app.get("/edit-food/:foodId", function(req,res){
    // get the food record by its food id
    let foodRecord = null;
    for (let record of foodRecords) {
        if (record.id == parseInt(req.params.foodId)) {
            foodRecord = record;
            break;
        }
    }
 
    res.render("edit-food",{
        foodRecord: foodRecord
    });

})

// END ROUTES

app.listen(3000, ()=>{console.log("Server started")});