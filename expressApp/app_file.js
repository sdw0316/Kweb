var express = require("express");
var bodyParser = require('body-parser');
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
});
var upload = multer({ storage : storage});
var fs = require("fs");
var app = express();

app.use(bodyParser.urlencoded({ extended : false}));
app.use("/user", express.static("uploads"));
app.set("views","./views_file");
app.set("view engine", "jade");
app.locals.pretty = true

app.listen(3000, function(){
	console.log("Connected 3000 port");
});

app.get("/upload",function(req,res){
	res.render("upload");
});
app.get("/topic/new",function(req,res){
	fs.readdir("data/",function(err, files){
		if(err){
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
		res.render("new", {topics: files});
	});
});

app.get(["/topic", "/topic/:id"],function(req,res){
	fs.readdir("data/",function(err, files){
		if(err){
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
		var id = req.params.id;
		//id 값 존재시
		if(id){
			fs.readFile("data/"+id,"utf8",function(err,data){
				if(err){
					console.log(err);
					res.status(500).send("Internal Server Error");
				}
				else{
					res.render("view", {topics: files, title:id, desc: data});
				}
			});
		}
		//id 값 없을 시
		else{
			res.render("view", {topics : files, title: "Welcome", desc: "Hello, JS!!"});
		}
	});
});

app.post("/topic",function(req,res){
	var title = req.body.title;
	var desc = req.body.description;
	fs.writeFile("data/"+title, desc, function(err){
		if(err){
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
		res.redirect("/topic/"+title);
	});
});
app.post("/upload", upload.single("userfile"), function(req,res){
	console.log(req.file.filename)
	res.send("Uploaded : " +req.file);
});
