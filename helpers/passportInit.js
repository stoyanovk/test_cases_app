const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcrypt");

async function init(email, password, done) {
  try {
    const user = await User.findOne({ where: { email } });
    console.log(password, user.password);
    const match = await bcrypt.compare(password, user.user_password);

    if (!user) return done(null, false, { message: "user is not exist" });
    if (!match) return done(null, false, { message: "wrong password" });
    return done(null, { user: user.user_name, email: user.email });
  } catch (e) {
    done(e);
  }
}

function passportInit(passport) {
  passport.use(new LocalStrategy({ usernameField: "email" }, init));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
module.exports = passportInit;
