# fire-guard-proxy (WORK IN PROGRESS...)
A simple module which authenticates a Firebase JWT token in the HTTP header and proxies the request to any endpoint.

# Configuration
To use this module, you are required to have a working Firebase project.
You will need to generate a Service Account Key from the Firebase console and place the generated JSON file in the same directory as this module for easy access.
Open the `proxy.js` file for editing using your prefered text editor. I will be using `nano`:
```
$ nano proxy.js
```

Define the location of Service Account key JSON file:
```
serviceAccount = require('LOCATION_HERE'),
```

Define the address you want the request to be proxied to after authentication:
```
endpoint = 'ENDPOINT_URL_HERE',
```

Define the port you want the module to listen on [OPTIONAL]:
```
port = PORT_NUMBER_HERE,
```

Define the key of the header you will storing the value of the token in:
```
token_key = 'TOKEN_KEY_HERE';
```

Define your Firebase Database URL:
```
databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
```

You can now save and close the file

# Usage
By default, the module listens on port `8080` on `localhost`.
The required dependencies can be installed and the listener started, by using the following command:
```
npm start
```
It is advisable to daemonize this module and let it run in the background.
You can use PM2, which is a process manager for Node.js applications. PM2 provides an easy way to manage and daemonize applications.

