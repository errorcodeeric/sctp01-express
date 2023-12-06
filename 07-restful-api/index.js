// 1. SETUP EXPRESS
const express = require('express');
const cors = require('cors');

// 1a. create the app
const app = express();

// Accept JSON requests
app.use(express.json());

// Enable CORS so that webpages on other domains may access
app.use(cors());

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
app.get('/postings', function(req,res){
    // 2nd argument of res.render takes an object
    // the keys in that object will be variables
    // in the .hbs file
    res.json(postings);
})

// One route to process the submission of the create form
app.post("/postings", function(req,res){

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
    res.json({
        "message": "New posting added"
    })
})

app.delete("/postings/:postingId", function(req,res){
    const postingId = parseInt(req.params.postingId);

    let indexToDelete = postings.findIndex(function(p){
        return p.id === postingId;
    })

    if (indexToDelete != -1) {
        // splice will modify the original array
        postings.splice(indexToDelete, 1);
    } else {
        console.log("indexToDelete not found");
    }

    res.redirect("/");
})


app.put("/postings/:postingId", function(req,res){
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

   res.json({
    "message":"Posting has been updated successfully"
   })
})

// 3. START SERVER (No routers after you've started server)
app.listen(3000, function(){
    console.log("Server has started");
})