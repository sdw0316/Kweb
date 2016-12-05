var OrientDB = require("orientjs");

var server = OrientDB({
	host : "localhost",
	port : 2424,
	username : "root",
	password : "1111"
});

var db = server.use("opentutorials");


//***********************CREATE**********************//
/*
var sqli = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
db.query(sqli,{
	params:{
		title:"Express",
		desc:"Express is framework for web"
	}
}).then(function(results){
	console.log(results);
});
*/

//***********************SELECT**********************//
/*
//SELECT ALL
var sqls = "SELECT FROM topic";
var param = {
	params:{
		rid:"21:0"
	}
};
db.query(sqls).then(function(results){
	console.log(results);
});
//SELECT with Condition
var sqls2 = "SELECT FROM topic WHERE @rid=:rid";
db.query(sqls2, param).then(function(results){
	console.log(results);
});
*/

//**************UPDATAE******************//
/*
var sqlu = "UPDATE topic SET title=:title WHERE @rid=:rid";
db.query(sqlu, {
	params : {
		title : "Can you??",
		rid : "#21:1"
	}
}).then(function(results){
	console.log(results);
});
*/

//****************DELETE*******************//
var sqld = "DELETE FROM topic WHERE @rid=:rid";
db.query(sqld,{
	params:{
		rid : "#22:0",
	}
}).then(function(results){
	console.log(results);
});