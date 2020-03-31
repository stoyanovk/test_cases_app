const env = require("env2")("./.env");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const app = express();
const sequelize = require("./database");
const api = require("./api/routes");
const passport = require("passport");
const passportInit = require("./helpers/passportInit")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new FileStore(),
    secret: process.env.SECRET_WORD,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 }
  })
);
app.use(passport.initialize());
app.use(passport.session());

passportInit(passport)

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
