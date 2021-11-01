var app = require("../server");

var http = require("http");
var https = require("https");
var express = require("express");

var port = normalizePort(process.env.PORT || 8082);
app.set("port", port);

var server = port == 443 ? https.createServer(app) : http.createServer(app);

// Reflection Server if required
if (port == 443) {
  debug("HTTP Web Server : Reflection Mode");
  var httpApp = express();
  httpApp.all("*", function (req, res) {
    return res.redirect("https://" + req.headers["host"] + req.url);
  });
  var httpServer = http.createServer(httpApp);
  httpServer.listen(80);
  httpServer.on("error", onError);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

server.on("upgrade", function (req, socket, head) {
  app.proxy.ws(req, socket, head, { target: process.env.API_URL });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
}
