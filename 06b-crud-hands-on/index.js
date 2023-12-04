// 1. SETUP EXPRESS
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

// 1a. create the app
const app = express();

// 1b setup our view engine (aka template engine)
// tell Express that we are using hbs
app.set('view engine', 'hbs');

app.use(express.urlencoded({
    "extended": false
}))


// 1c setup wax-on
wax.on(hbs.handlebars);

// 1d tell wax-on where to find the layout files
wax.setLayoutPath("./views/layouts");

// 1e use static files (i.e, images, css, js etc. -- that is, all content not generated
// by our routes)
app.use(express.static('public'));

// setup the 188 handlebars helpers
const helpers = require('handlebars-helpers')({
    handlebars: hbs.handlebars
  });

// Mock database
let postings = [
    {
      id: 4001,
      title: "Old boardgame for sales",
      price: 11.50,
      payments: ["cod", "paynow"],
      type: "entertainment"
    },
    {
      id: 4002,
      title: "Second hand clothings",
      price: 25.00,
      payments: ["paynow"],
      type: "clothings"
    },
    {
      id: 4003,
      title: "Old LED TV",
      price: 250.00,
      payments: ["cod"],
      type: "electronic"
    }
]

// 2. CREATE ROUTES
app.get('/', function(req,res){
    // 2nd argument of res.render takes an object
    // the keys in that object will be variables
    // in the .hbs file
    res.render("index", {
        "postings": postings
    });
})

// One route to display the create form
app.get('/add-posting', function(req,res){
    res.render("add-posting");
})

// One route to process the submission of the create form
app.post("/add-posting", function(req,res){

    let payments = req.body["payment-types"];
    if (payments) {
        payments = Array.isArray(payments) ? payments : [payments];
    } else {
        payments =[];
    }

    const newPosting = {
        title: req.body.title,
        price: req.body.price,
        payments:payments,
        type: req.body.type
    }

    postings.push(newPosting);
    res.redirect("/");
})

// Route display the confirmation of delete
app.get("/delete-posting/:postingId", function(req,res){
    
    // 1. Get the ID of the record from the URL parameters
    const postingId = parseInt(req.params.postingId);
    
    // 2. find the record from the database
    // let wantedPosting = null;
    // for (let p of postings) {
    //     // match by their id
    //     if (p.id === postingId) {
    //         wantedPosting = p;
    //         break;
    //     }
    // }

    let wantedPosting = postings.find(function(p){
        return p.id === postingId;
    });

    // let wantedPosting = posting.filter(function(p){
    //     return p.id===postingId;
    // })[0];

    res.render('delete-posting', {
        "wantedPosting": wantedPosting
    })
})

app.post("/delete-posting/:postingId", function(req,res){
    const postingId = parseInt(req.params.postingId);

    // use a full for loop to get the index
    // let indexToDelete = null;
    // for (let i = 0; i < postings.length; i++) {
    //     if (postings[i].id === postingId) {
    //         indexToDelete = i;
    //         break;
    //     }
    // }

    let indexToDelete = postings.findIndex(function(p){
        return p.id === postingId;
    })
  
    // let indexToDelete = -1;
    // postings.forEach(function(p, index){
    //     if (p.postingId === postingId) {
    //         indexToDelete = index;
    //     }
    // }) 

    if (indexToDelete != -1) {
        // splice will modify the original array
        postings.splice(indexToDelete, 1);
    } else {
        console.log("indexToDelete not found");
    }

    res.redirect("/");
})

app.get("/edit-posting/:postingId", function(req,res){
    const postingToEdit = postings.find(p => p.id === parseInt(req.params.postingId));
    console.log(postingToEdit);
    res.render('edit-posting', {
        postingToEdit
    })
})

app.post("/edit-posting/:postingId", function(req,res){
    // get the index of the posting that we want to change
    const indexToEdit = postings.findIndex(p => p.id===parseInt(req.params.postingId));
    if (indexToEdit != -1) {
        // get the data from the form
        let {title, price, type} = req.body;
        let payments = req.body["payment-types"];
        if (payments) {
            payments = Array.isArray(payments) ? payments : [payments];
        } else {
            payments = [];
        }
        const modifiedProduct = {
            id: parseInt(req.params.postingId), title, price, payments, type
        }
    
        postings[indexToEdit] = modifiedProduct;
        console.log(postings);
    }

    res.redirect("/");
})

// 3. START SERVER (No routers after you've started server)
app.listen(3000, function(){
    console.log("Server has started");
})