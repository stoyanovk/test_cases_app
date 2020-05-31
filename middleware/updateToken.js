const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const options = !req.remember ? { expiresIn: 3600 * 24 * 1000 } : null;
  req.token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, options);

  next();
};
