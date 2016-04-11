// Require the express module
var express = require("express");
var app = express();
// require body-parser
var bodyParser = require("body-parser");
// Integrate body-parser with app
app.use(bodyParser.urlencoded());

// require path
var path = require("path");

// requiring mongoose
var mongoose = require("mongoose")
// connect mongoose to MongoDB
// mongoose.connect("mongodb://localhost/dashboard");


// set static folder directory
app.use(express.static(path.join(__dirname,"./static")));

// set views folder directory
app.set("views", path.join(__dirname, "./views"));
// seting view engine set to ejs
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index")
})



port = 8000;
app.listen(port, function(){
	console.log("**********Listening to port 8000**********")
})