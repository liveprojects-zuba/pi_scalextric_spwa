const express = require('express');
const http = require('http')
const path = require('path');
var fs = require('fs');


var getClientConfig = function () {
  var result = {};

  if(!process.env.HOST) throw new Error("HOST is not defined");
  if(!process.env.CHANNELS) throw new Error("CHANNELS is not defined");
  
  result.HOST = process.env.HOST;
  result.CHANNELS = process.env.CHANNELS;
  
  return result;
}

var writeClientConfig = function(config){
  var client_config = config;
  client_config = "angular.module('app').constant('piDetails'," + JSON.stringify(client_config) + ");";
  fs.writeFileSync('./app/components/piDetails/piDetailsConstant.js',client_config);
}

writeClientConfig(getClientConfig());


const app = express();

app.use(express.static(path.join(__dirname, '')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const port = process.env.PORT || 8080;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));