const env = require("env2")("./.env");
const express = require("express");
const helmet = require("helmet");
const app = express();
const sequelize = require("./database/database");
const api = require("./api/routes");
const cors = require("cors");
const errorMiddleware = require("./middleware/errors");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.RESOLVE_HOST }));
app.use(helmet());
api(app);
app.use(errorMiddleware);

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, function () {
      console.log(`Example app listening on port ${PORT}!`);
    });
  } catch (e) {
    // console.log(e);
  }
}
start();
