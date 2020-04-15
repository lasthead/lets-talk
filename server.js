/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const app = express();

app.use("/", serveStatic(path.join(__dirname, "/dist")));

app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

console.log(process.env, process.env.PORT);
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`app is listening on port: ${port}`);
