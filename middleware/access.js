const jwt = require("jsonwebtoken");
async function access(req, res, next) {
  try {
    if (!req.headers.referer.includes(process.env.RESOLVE_HOST))
      throw new Error("bad host");

    const token = req.headers["x-access-token"] || req.headers["authorization"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded && decoded.lifeTime < Date.now()) {
      req.user = decoded;
      next();
    }
    return res.json({ message: "log in please" });
  } catch (e) {
    console.log(e);
  }
}
module.exports = access;
