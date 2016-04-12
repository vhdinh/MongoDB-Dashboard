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
    		res.render('index', {panda: panda})
    	}
    })
})


app.post('/new', function(req,res){
	console.log("POST DATA ------", req.body);
	var pandon = new Panda({name: req.body.name, activity: req.body.activity, language: req.body.language});
	console.log(pandon)
	pandon.save(function(err){
		if(err){
			res.json("index", {title: "you have errors!", errors: pandon.errors})
		}
		else {
			res.redirect("/")
		}
	})
})

app.get('/:id/edit',function(req, res){
	console.log(req.params.id)
	Panda.findOne({_id : req.params.id}, function(err,panda){
		res.render("panda", {thispanda: panda})	
	})
})

app.post("/update/:id", function(req, res){
	Panda.update({_id: req.params.id, name: req.body.name, activity: req.body.activity, language: req.body.language} , function(err, user){
		if(err){
			res.json("index", {title: "you have errors!", errors: pandon.errors})
		}
		else{
			res.redirect('/')
		}
	})
})

app.get("/:id/destroy", function(req, res){
	console.log("DESTROY",req.params.id)
	Panda.remove({_id: req.params.id}, function(err, panda){
		res.redirect("/")	
	})
})


port = 8000;
app.listen(port, function(){
	console.log("**********Listening to port 8000**********")
})