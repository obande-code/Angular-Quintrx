require("dotenv").config();

const path = require("path");
const ejs = require("ejs");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.set("view engine", "html");
app.set("views", path.join(__dirname, "/dist/Web"));
app.engine("html", ejs.renderFile);

const httpProxy = require("http-proxy");

app.proxy = httpProxy.createProxyServer({
  target: process.env.API_URL,
  changeOrigin: true,
  ws: true,
});

app.use("/api", (req, res) => {
  req.url = "/" + req.url;
  app.proxy.web(req, res, {}, function (e) {
    res.status(e.status || 500).json(e);
  });
});

app.get("/", (req, res) => {
  res.render("index", null);
});

app.use(express.static(__dirname + "/dist/Web"));

app.get("*", (req, res) => {
  res.render("index", null);
});

console.log("listening on port 8082");

module.exports = app;
