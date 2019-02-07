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


*Example https://aliceliveprojects.github.io/pi_scalextric_spwa/src/index.html#!/index?brokerPort=8000&brokerHost=broker.hivemq.com&uuid=testUUID*

*Note your browser will worngly assume that the SPWA is trying to load unsafe scripts, you must allow the scripts to load for the application to work* 


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


---


This is the work of [Yusof Bandar](https://github.com/YusofBandar) for [DigitalLabs@MMU](https://digitallabs.mmu.ac.uk/).

<p align="center">
<img align="middle" src="https://trello-attachments.s3.amazonaws.com/5b2caa657bcf194b4d089d48/5b98c7ec64145155e09b5083/d2e189709d3b79aa1222ef6e9b1f3735/DigitalLabsLogo_512x512.png"  />
 </p>
 
 
<p align="center">
<img align="middle" src="https://trello-attachments.s3.amazonaws.com/5b2caa657bcf194b4d089d48/5b98c7ec64145155e09b5083/e5f47675f420face27488d4e5330a48c/logo_mmu.png" />
 </p>

