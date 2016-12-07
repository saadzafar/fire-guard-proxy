#!/usr/bin/env nodejs
//proxy.js
'use strict'
const admin = require('firebase-admin'),
	express = require('express'),
	httpProxy = require('http-proxy'),
	cors = require('cors'),
	apiProxy = httpProxy.createProxyServer(),
	serviceAccount = require(''), //service account key JSON file
	endpoint = '', //proxy destination
	port = 8080, //port on which application listens
	token_key = ''; //key of the token header

//initialize the the Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://<DATABASE_NAME>.firebaseio.com" //replace <DATABASE_NAME> with the name of your Firebase Database
});	
	
var app = express(); //initialize Express

app.use(cors()); //allows the sharing of restricted resources to be requested from an outside domain

app.get('/*', function(req, res) { //GET API
	authenticate(req, res);
});

app.put('/*', function(req, res) { //PUT API
	authenticate(req, res);
});

app.post('/*', function(req, res) { //POST API
	authenticate(req, res);
});

app.delete('/*', function(req, res) { //DELETE API
	authenticate(req, res);
});

app.listen(port, 'localhost'); //initialize listener for requests

//authenticates the token using Firebase Admin SDK
function authenticate (req, res) {
	var idToken = req.headers[token_key]; //grab the token from the http header
	
	if (idToken) {
		//uses the Firebase Admin SDK to decode the token and get the UID
		admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
			var uid = decodedToken.uid;
		
			console.log(uid, decodedToken.name);
			apiProxy.web(req, res, {target: endpoint});
		}).catch(function(error) {
			console.log('Invalid token or token expired');
			res.send('You have provided an invalid token or your token has expired\n')
		});
	}
	else { 
		console.log('no token provided');
		res.send('Please provide a token\n');
	 }
}
