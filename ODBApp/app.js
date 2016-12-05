var express = require("express");
var bodyParser = require('body-parser');
var fs = require("fs");
var app = express();
var OrientDB = require("orientjs");
var server = OrientDB({
	host : "localhost",
	port : 2424,
	username : "root",
	password : "1111"
});
var db = server.use("opentutorials");

app.use(bodyParser.urlencoded({ extended : false}));
app.use("/user", express.static("uploads"));
app.set("views","./views");
app.set("view engine", "jade");
app.locals.pretty = true

app.listen(3000, function(){
	console.log("Connected 3000 port");
});

app.get("/topic/add",function(req,res){
	var sql = "SELECT * FROM topic";
	db.query(sql).then(function(topics){
		res.render("add", {topics: topics});
	});
});

app.get("/topic/:id/edit",function(req,res){
	var sql = "SELECT * FROM topic";
	var id = req.params.id;
	db.query(sql).then(function(topics){
		var sql = "SELECT * FROM topic WHERE @rid=:rid";
		db.query(sql, {
			params : {
				rid : id,
			}
		}).then(function(topic){
			res.render("edit", {topics: topics, topic : topic[0]});
		});
	});
});

app.get("/topic/:id/delete",function(req,res){
	var sql = "SELECT * FROM topic";
	var id = req.params.id;
	db.query(sql).then(function(topics){
		var sql = "SELECT * FROM topic WHERE @rid=:rid";
		db.query(sql, {
			params : {
				rid : id,
			}
		}).then(function(topic){
			res.render("delete", {topics: topics, topic : topic[0]});
		});
	});
});
app.get(["/topic", "/topic/:id"],function(req,res){
	var sql = "SELECT * FROM topic";
	db.query(sql).then(function(topics){
		var id = req.params.id;
		if(id){
			var sql = "SELECT * FROM topic WHERE @rid=:rid";
			db.query(sql, {
				params : {
					rid : id,
				}
			}).then(function(topic){
				res.render("view", {topics : topics, topic: topic[0]});
			});
		}
		else{
			res.render("view", {topics : topics});
		}
	});
});

app.post("/topic/add",function(req,res){
	var title = req.body.title;
	var desc = req.body.description;
	var author = req.body.author;
	var sql = "INSERT INTO topic (title, description, author) VALUES(:title, :desc, :author)";
	db.query(sql,{
		params:{
			title : title,
			desc : desc,
			author : author
		}
	}).then(function(result){
		res.redirect("/topic/"+encodeURIComponent(result[0]["@rid"]));
	});
});

app.post("/topic/:id/edit",function(req,res){
	var id = req.params.id;
	var title = req.body.title;
	var desc = req.body.description;
	var author = req.body.author;
	var sql = "UPDATE topic SET title=:title, description=:desc, author=:author WHERE @rid=:rid";
	db.query(sql,{
		params:{
			title : title,
			desc : desc,
			author : author,
			rid : id
		}
	}).then(function(result){
		res.redirect("/topic/"+encodeURIComponent(result[0]["@rid"]));
	});
});

app.post("/topic/:id/delete",function(req,res){
	var id = req.params.id;
	var sql = "DELETE FROM topic WHERE @rid=:rid";
	db.query(sql,{
		params:{
			rid : id
		}
	}).then(function(result){
		res.redirect("/topic");
	});
});
