var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('docs'))
/*
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/docs/index.html'));
});
*/

app.post('/webhook', (req, res) => {
  // TODO: trigger the build, restart pm2 
  res.send(200);
});

app.listen(3000);
