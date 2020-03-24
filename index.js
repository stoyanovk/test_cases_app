const env = require("env2")("./.env");
const express = require("express");
const app = express();
const secualize = require("./database");
const api = require("./api");

app.use(express.urlencoded({ extended: false }));

app.use("/", api);

async function start() {
  try {
    await secualize.sync();
    app.listen(3000, function() {
      console.log("Example app listening on port 3000!");
    });
  } catch (e) {
    console.log(e);
  }
}
start();
