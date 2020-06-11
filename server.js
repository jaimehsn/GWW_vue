// server.js

var express = require('express');
var serveStatic = require('serve-static');
var fs = require('fs')
var https = require('https')
var app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 8443;
https.createServer({
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
    passphrase: 'L0sm0nt3sn0t13n3n0j0s'
}, app).listen(port);
console.log('server started ' + port);