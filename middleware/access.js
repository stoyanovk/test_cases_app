const jwt = require("jsonwebtoken");
const { BaseError, UnauthorizedError } = require("../helpers/errors");
const production = process.env.NODE_ENV === "production";

function access(req, res, next) {
  if (production && !req.headers.referer.includes(process.env.RESOLVE_HOST)) {
    next(new BaseError({ message: "bad request" }));
  }

  const token = req.headers["x-access-token"];

  if (!token) {
    next(new UnauthorizedError({ message: "login please" }));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    req.user = { ...decoded.user };
    return next();
  }

  next(new UnauthorizedError({ message: "login please" }));
}
module.exports = access;
