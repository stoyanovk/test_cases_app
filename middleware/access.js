const jwt = require("jsonwebtoken");
const { BaseError, UnauthorizedError } = require("../helpers/errors");
const production = process.env.NODE_ENV === "production";

function access(req, res, next) {
  try {
    if (production && !req.headers.referer.includes(process.env.RESOLVE_HOST)) {
      throw new BaseError({ message: "bad request" });
    }

    const token = req.headers["x-access-token"];

    if (!token) {
      throw new UnauthorizedError({ message: "login please" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new UnauthorizedError({ message: "login please" });
    }
    req.user = decoded.user;
    req.remember = decoded.remember;
    return next();
  } catch (e) {
    return next(e);
  }
}
module.exports = access;
