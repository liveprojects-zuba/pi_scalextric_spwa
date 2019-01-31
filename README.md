# pi_scalextric_spwa
Single Page Web Application (SPWA) to control the pi scalextric

# Deployment

To pass the broker details to the SPWA can be done either 2 ways

- Via the url parameters
- Via environment variables

*For most cases you should only use the url parameters method. Using environment variables allows for quick testing* 

#### Enironment Variables

| Variable      | Description  |
| ------------- |:-------------:|
| UUID   | Pi id|      
| BROKERHOST   | Broker Host|
| BROKERPORT   | Broker Port|
| USERNAME   | Broker Username|
| PASSWORD   | Broker Password|

#### Url Parameters

| Variable      | Description  |
| ------------- |:-------------:|
| uuid   | Pi id|      
| brokerHost   | Broker Host|
| brokerPort   | Broker Port|
| username   | Broker Username|
| password   | Broker Password|

*Example  https://aliceliveprojects.github.io/pi_scalextric_mqtt/spwa/src/index.html#!/index?brokerPort=8000&brokerUrl=broker.hivemq.com&username=batman&password=brucewayne*

*To generate the QR code, to deploy the spwa, see [QrCode](https://github.com/aliceliveprojects/pi_scalextric_mqtt/tree/master/mqtt/src/QrCode)*


## Deploying Server 

### Express
To host SPWA using express.

```
 node server.js
```

---

### http-server

If using environment variables

```
node writePiConfig.js
```


```
sudo npm install http-server -g
http-server --cors
```


*To run on https read https://digitallabs.mmu.ac.uk/taming-the-urban-wild/#more-1657*

---

### WebIOPi
To serve a custom index.html file, the config file must be modified

```nano /etc/webiopi/config```

Under the HTTP section modify to match below (leave other details untouched)

```
enabled = true
doc-root = PATH_TO_INDEX.HTML_FOLDER
welcome-file = index.html
``` 

If using environment variables

```
node writePiConfig.js
```
