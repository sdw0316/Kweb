const express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "jade");	//어떤 템플릿 엔진을 사용하는것인가?
app.set("views", "./views");	//templete directory는 어디냐?
app.locals.pretty = true;

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended : false}));

//form submit examples
app.get("/form",function(req,res){
	res.render("form");
});
app.post("/submit",function(req,res){
	var title = req.body.title;
	var desc = req.body.description;
	res.send("제목 : " + title + "<br>" + "내용 : " + desc);
});
app.get("/submit",function(req,res){
	var title = req.query.title;
	var desc = req.query.description;
	res.send("제목 : " + title + "<br>" + "내용 : " + desc);
});

//get and semantic URL
app.get("/topic/:id",function(req,res){
	var topics = [
		"js..",
		"html..",
		"php.."
	]
	var output = `
		<a href="/topic/0">Js</a><br>
		<a href="/topic/1">HTML</a><br>
		<a href="/topic/2">PHP</a><br>
		${topics[req.params.id]}
	`;
	res.send(output);
});


//template example
app.get("/template",function(req,res){
	res.render("temp", { time : Date(), title : req.query.title});
});
//dynamic page routing
app.get("/dynamic",function(req,res){
	var list = '';
	for (var i=0;i<5;i++){
		list = list + "<li>"+(i+1)+"</li>";
	}
	var output = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Document</title>
			<ul>
				${list}
			</ul>
		</head>
		<body>
			Hello dynamic!
		</body>
		</html>
	`;
	res.send(output);
});
//static file example
app.get("/nang",function(req,res){
	res.send("<h1>냉면</h1>, <img src='/nang.jpg'>")
});

app.get("/",function(req,res){
	res.send("Hello World!");
});
app.get("/login",function(req,res){
	res.send("<h1>login</h1>");
});
app.listen(3000, function(){
	console.log("Connected 3000 port");
});