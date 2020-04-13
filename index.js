const env = require("env2")("./.env");
const express = require("express");
const app = express();
const sequelize = require("./database");
const api = require("./api/routes");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.RESOLVE_HOST }));
api(app);

async function start() {
  try {
    await sequelize.sync({ force: false });
    app.listen(3001, function () {
      console.log("Example app listening on port 3001!");
    });
  } catch (e) {
    console.log(e);
  }
}
start();
