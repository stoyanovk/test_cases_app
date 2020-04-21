const { ForbiddenError } = require("../helpers/errors");
const production = process.env.NODE_ENV === "production";

module.exports = function (req, res, next) {
  if (production) {
    return req.user.admin
      ? next()
      : next(new ForbiddenError("user must be admin"));
  }
  next();
};
