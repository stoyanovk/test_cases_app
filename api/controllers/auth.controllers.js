const users = require("../../models/users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports.createUser = async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const candidate = await users.findOne({ where: { email: req.body.email } });
    console.log(candidate);
    if (candidate) {
      return res.status(226).json({ message: "user already exist" });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await users.create({
      user_name: req.body.user_name,
      user_password: password,
      email: req.body.email.toLowerCase()
    });
    res.status(201).json({ status: "success" });
  } catch (e) {
    console.log(e);
  }
};


