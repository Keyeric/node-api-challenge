const express = require("express");

const server = express();

// Posts & User Router
const projectRouter = require("./data/routes/projectRouter");
const actionRouter = require("./data/routes/actionRouter");

server.use(express.json());
server.use(logger);

// Endpoint routers
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

//Base url endpoint(s)
server.get("/", (req, res) => {
  res.status(200).json(`Code Time`);
});
server.get("/api", (req, res) => {
  res
    .status(200)
    .send("<h1> Navigate to </h1> <h2>/projects</h2> <h2>/actions</h2>");
});
//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${req.originalUrl}`
  );
  next();
}
module.exports = server;
