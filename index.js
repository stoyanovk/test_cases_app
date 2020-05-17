const env = require("env2")("./.env");
const express = require("express");
const app = express();
const sequelize = require("./database/database");
const api = require("./api/routes");
const cors = require("cors");
const errorMiddleware = require("./middleware/errors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.RESOLVE_HOST }));
api(app);
app.use(errorMiddleware);

async function start() {
  try {
    await sequelize.sync();
    app.listen(3001, function () {
      console.log("Example app listening on port 3001!");
    });
  } catch (e) {
    console.log(e);
  }
}
start();
