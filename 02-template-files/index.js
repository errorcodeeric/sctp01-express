const express = require('express');
const app = express();

// Configure Express to  use hbs
app.set("view engine", "hbs");

// Configure Express to send back static files
// express.static is function call to Express which
// will setup the static files and the string parameter
// is the name of the folder to find those files
app.use(express.static("public"));

// Routes
app.get("/", function(req,res){
    // we want our response to be the content of the file `views\index.hbs`
    const today = new Date(); // create a new Date object, it will automatically be today's date (on the server)
    res.render("index.hbs", {
        "todayDate": today,
        "name":"Tan Ah Kow"
    });
})

app.get('/about-us', function(req,res){
    res.render('about', {
        
    })
})

app.listen(3000, function(){
    console.log("Server has started");
})

