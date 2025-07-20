import jsonServer from "json-server";

// src/server.js
// This file sets up a JSON server to serve the db.json file as a REST API. 
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors, no-cache)
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("✅ JSON Server is running on port 3000");
});
