const jwt = require("jsonwebtoken");
async function access(req, res, next) {
  try {
    // if (!req.headers.referer.includes(process.env.RESOLVE_HOST))
    //   throw new Error("bad host");

    const token = req.headers["x-access-token"];
    if (!token) {
      return res.json({ message: "log in please" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.user = decoded;
      return next();
    }
    return res.json({ message: "log in please" });
  } catch (e) {
    console.log(e);
    res.json({ message: "log in please" });
  }
}
module.exports = access;
