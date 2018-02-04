var express = require("express");
var app = express();
var path = require("path");
const shell = require("shelljs");
app.use(express.static(path.resolve(__dirname, "../app/build")));
/*
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/docs/index.html'));
});
*/

app.post("/webhook", (req, res) => {
  shell.exec("../deploy.sh");
  res.send(200);
});

console.log("Listening on port 3000");
app.listen(3000);
