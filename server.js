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
mongoose.connect("mongodb://localhost/dashboard");
var PandaSchema = new mongoose.Schema({
	name: String,
	activity: String,
	language: String,
})

// add validation using .path() method
PandaSchema.path("name").required(true, "name cannot be blank");
PandaSchema.path("activity").required(true, "activity cannot be blank");




mongoose.model("Panda", PandaSchema) //setting Schema in our Models as Panda
var Panda = mongoose.model("Panda") //retrieving this Schema from our models named Panda


// set static folder directory
app.use(express.static(path.join(__dirname,"./static")));

// set views folder directory
app.set("views", path.join(__dirname, "./views"));
// seting view engine set to ejs
app.set("view engine", "ejs");




app.get("/", function(req, res){
	Panda.find({}, function(err, panda){
    	// find all users in db
    	if(err){
    		console.log("no panda in database")
    	}
    	else {
    		for( i in panda){
    			console.log(panda[i].name)
    			console.log(panda[i].activity)
    			console.log(panda[i].language)
    		}
    		res.render('index', {panda: panda})
    	}
    })
})


app.post('/new', function(req,res){
	console.log("POST DATA ------", req.body);
	var panda = new Panda({name: req.body.name, activity: req.body.activity, language: req.body.language});
	console.log(panda)
	panda.save(function(err){
		if(err){
			res.render("index", {title: "you have errors!", errors: panda.errors})
		}
		else {
			res.redirect("/")
		}
	})
})

port = 8000;
app.listen(port, function(){
	console.log("**********Listening to port 8000**********")
})