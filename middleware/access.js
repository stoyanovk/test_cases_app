const jwt = require("jsonwebtoken");
const Users = require("../database/models/users");
const Tokens = require("../database/models/tokens");
const { BaseError, UnauthorizedError } = require("../helpers/errors");
const production = process.env.NODE_ENV === "production";

async function access(req, res, next) {
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

    const candidate = await Users.findOne({
      include: [
        {
          model: Tokens,
          attributes: ["id"],
          where: { token },
        },
      ],
    });

    if (!candidate) {
      throw new UnauthorizedError({ message: "login please" });
    }

    req.user = candidate;
    req.token = token;
    req.remember = decoded.remember;

    return next();
  } catch (e) {
    return next(e);
  }
}
module.exports = access;
