// 1. SETUP EXPRESS
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const BIN_ID = "657067e454105e766fda685c";
const BASE_JSON_BIN_URL="https://api.jsonbin.io/v3/b";

// 1a. create the app
const app = express();

// Accept JSON requests
app.use(express.json());

// Enable CORS so that webpages on other domains may access
app.use(cors());


// 2. CREATE ROUTES
app.get('/postings', async function(req,res){
    // 2nd argument of res.render takes an object
    // the keys in that object will be variables
    // in the .hbs file
    const response = await axios.get(`${BASE_JSON_BIN_URL}/${BIN_ID}/latest`);
    const postings = response.data;
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
    res.status(201);
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
        res.json({
            "success":"The posting has been deleted"
        })
    } else {
        res.status(404); // tell the client that the posting is not found
        res.json({
            "error":"The given postingId does not exists"
        })
    }

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