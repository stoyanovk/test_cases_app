const env = require("env2")("./.env");
const express = require("express");
const app = express();
const sequelize = require("./database");
const api = require("./api/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

api(app);

async function start() {
  try {
    await sequelize.sync({ force: false });
    app.listen(3000, function() {
      console.log("Example app listening on port 3000!");
    });
  } catch (e) {
    console.log(e);
  }
}
start();
