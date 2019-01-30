const express = require('express');
const http = require('http')
const path = require('path');
var fs = require('fs');


var getClientConfig = function () {
  var result = {};

  if(!process.env.UUID) process.env.UUID = '';
  if(!process.env.BROKERHOST) process.env.BROKERHOST = '';
  if(!process.env.BROKERPORT) process.env.BROKERPORT = '';
  if(!process.env.USERNAME) process.env.USERNAME = '';
  if(!process.env.PASSWORD) process.env.PASSWORD = '';

  result.UUID = process.env.UUID;
  result.HOST = process.env.BROKERHOST;
  result.PORT = process.env.BROKERPORT;
  result.USERNAME = process.env.USERNAME;
  result.PASSWORD = process.env.PASSWORD;
  
  return result;
}

var writeClientConfig = function(config){
  var client_config = config;
  client_config = `angular.module('app').value('brokerDetails',${JSON.stringify(client_config)});`;
  fs.writeFileSync('./app/components/brokerDetails/brokerDetailsConstant.js',client_config);
}

writeClientConfig(getClientConfig());


const app = express();

app.use(express.static(path.join(__dirname, '')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

if(!process.env.ADDRESS) process.env.ADDRESS = "127.0.0.1";

var ip_addresses = process.env.ADDRESS.split(",");

const server = http.createServer(app);
server.listen(port,ip_addresses,() => console.log('running'));