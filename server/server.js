var express = require("express");
var app = express();
var path = require("path");
const shell = require("shelljs");

const PUBLIC_DIR = path.resolve(__dirname, "../app/build");
const PUBLIC_INDEX = path.resolve(PUBLIC_DIR, "secret.html");
app.use(express.static(PUBLIC_DIR));

app.post("/webhook", (req, res) => {
  console.log("WEBHOOK RECEIVED! ABOUT TO RE-DEPLOY");
  res.send(200);
  shell.exec(path.resolve(__dirname, "../deploy.sh"));
});

app.get("/secret", (req, res) => {
  res.sendFile(PUBLIC_INDEX);
});

console.log("Listening on port 3000");
app.listen(4000);
