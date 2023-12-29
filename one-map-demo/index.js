require("dotenv").config();
const express = require('express');
// cors: cross origin resources sharing
// if not enabled then the RESTful API cannot be called from browsers
const cors = require("cors");
const { getOneMapToken } = require("./OneMapToken");

const app = express();
app.use(cors());

app.get("/oneMapToken", async function(req,res){
    const response = await getOneMapToken();
    res.json({
       ...response
    })
})


app.listen(3000, function(){
    console.log("Server has started")
});



