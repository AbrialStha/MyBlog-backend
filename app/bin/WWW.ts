import app from "../app";
import http from "http";
import config from "../config";

import { normalizePort } from "./helper";
var debug = require("debug")("MyBlog:server");

/**
 * Get port from environment and store in Express.
 */

const port: Number = normalizePort(process.env.PORT || config.port_number);
app.set("port", port);

/**
 * Create HTTP server.
 */

let server: http.Server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", (error: any) => {
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
});

server.on("listening", () => {
  var addr: any = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
});
