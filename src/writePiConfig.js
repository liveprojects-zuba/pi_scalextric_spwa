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
  result.SSL = process.env.SSL;
  
  return result;
}

var writeClientConfig = function(config){
  var client_config = config;
  client_config = `angular.module('app').value('brokerDetails',${JSON.stringify(client_config)});`;
  fs.writeFileSync('./app/components/brokerDetails/brokerDetailsConstant.js',client_config);
}

writeClientConfig(getClientConfig());