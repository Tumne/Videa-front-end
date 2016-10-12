// TODO: figure out 

var express = require('express');
var app = express();
var routes = require('routes');
var path = require('path');

app.use(express.static(path.resolve('client')));

app.use('/*', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

var server = app.listen(4000, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log(server.address());
    console.log('Express app listening at http://%s:%s', host, port);

});