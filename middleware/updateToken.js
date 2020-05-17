const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  req.token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
    expiresIn: 3600 * 24 * 1000,
  });

  next();
};
