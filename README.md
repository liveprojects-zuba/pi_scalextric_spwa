# pi_scalextric_spwa
Single Page Web Application (SPWA) to control the pi scalextric

# Setting Http Server
Setting up Raspberry Pi to serve a SPWA

## Static IP

*Setting a static ip will disconnect the Pi from the interent please read the Http Server section and install the needed modules*

Once the Pi is connected to the router, a static ip needs to be configured. 

**The Pi ip address should be : ```192.168.1.3```**

**The Pi routers address should be : ```192.168.1.1```**

To configure a static ip either follow the intructions below or from [Raspberry Pi Org](https://www.raspberrypi.org/learning/networking-lessons/rpi-static-ip-address/) or [Raspberry Pi Org Archived](http://web.archive.org/web/20181213192602/https://www.raspberrypi.org/learning/networking-lessons/rpi-static-ip-address/)

Open a terminal and type ```sudo nano /etc/dhcpcd.conf``` and append this to the bottom of the script

```
interface eth0

static ip_address=192.168.1.3/24
static routers=192.168.1.1
static domain_name_servers=192.168.0.1

interface wlan0

static ip_address=192.168.1.3/24
static routers=192.168.1.1
static domain_name_servers=192.168.0.1
```

*If another ip address is being used, the default ip address needs to be changed within the SPWA located in app.js*

---

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

*Example  https://aliceliveprojects.github.io/pi_scalextric_mqtt/spwa/src/index.html#!/index?brokerPort=8000&brokerUrl=broker.hivemq.com&username=batman&password=brucewayne


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
