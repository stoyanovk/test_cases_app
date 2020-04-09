const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const bcrypt = require("bcrypt");

async function init(email, password, done) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return done(null, false, { message: "user is not exist" });

    const match = await bcrypt.compare(password, user.user_password);

    if (!match) return done(null, false, { message: "wrong password" });
    return done(null, user);
  } catch (e) {
    done(e);
  }
}

function passportInit(passport) {
  passport.use(new LocalStrategy({ usernameField: "email" }, init));

  passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });
}
module.exports = passportInit;
