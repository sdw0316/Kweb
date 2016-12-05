var fs = require("fs");

//sync file
console.log(1);
var data = fs.readFileSync("./data.txt",{encoding : "utf8"});
console.log(data);

//async file
console.log(2);
fs.readFile("data.txt",{encoding : "utf8"}, function(err,data){
	console.log(3);
	console.log(data);
});
console.log(4);