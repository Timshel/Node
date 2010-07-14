#!/usr/bin/env node
/**
 * Simple webserver with logging. By default, serves whatever files are
 * reachable from the directory where node is running.
 */
var fs = require('fs');
var sys = require('sys');
var http = require('http');
var ws = require("ws");
var antinode = require('antinode');

fs.readFile(process.argv[2] || './settings.json', function(err, data) {
    var settings = {};
    if (err) {
        sys.puts('No settings.json found. Using default settings');
    } else {
        try {
            settings = JSON.parse(data.toString('utf8',0,data.length));
        } catch (e) {
            sys.puts('Error parsing settings.json: '+e);
            process.exit(1);
        }
    }
    antinode.start(settings);
});

var httpServer = http.createServer( function(req, res){} );

var server = ws.createServer({
  debug: true
}, httpServer);

server.addListener("listening", function(){
    sys.puts("Listening...");
});

server.addListener("connection", function(conn){
	console.log("connection");

    server.send(conn.id, "Connected as: "+conn.id);
    conn.addListener("message", function(message){
        sys.puts("Message: " + message);
        conn.broadcast("<"+conn.id+"> "+message);
    });
});

server.addListener("close", function(conn){
    sys.puts("Closing...");
    conn.broadcast("<"+conn.id+"> disconnected");
});

// lancement du serveur sur le port 8000
server.listen(8000);

console.log("Server de WebSocket démaré sur : 8000");

