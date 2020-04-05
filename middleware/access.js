const jwt = require("jsonwebtoken");
const Users = require("../models/users");
async function access(req, res, next) {
  // Возникли трудности
  //process.env.RESOLVE_HOST == http://localhost:3001
  //req.headers.referer == http://localhost:3001/
  // если RESOLVE_HOST будет равен http://localhost:3001/ то его не пропускает корса
  try {
    // if (!req.headers.referer.includes(process.env.RESOLVE_HOST))
    //   throw new Error("bad host");
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ message: "log in please" });
    }

    const user = await Users.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.json({ message: "log in please" });
    }
    
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
}
module.exports = access;
