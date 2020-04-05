const users = require("../../models/users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports.createUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const candidate = await users.findOne({ where: { email: req.body.email } });

    if (candidate) {
      return res.status(226).json({ message: "user already exist" });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await users.create({
      user_name: req.body.user_name,
      user_password: password,
      email: req.body.email.toLowerCase(),
    });
    console.log(user);
    res.status(201).json({ status: "success", data: { user } });
  } catch (e) {
    console.log(e);
  }
};

module.exports.login = async function (req, res) {
  try {
    const candidate = await users.findOne({ where: { email: req.body.email } });

    if (!candidate) return res.json({ message: "Wrong email or password" });
    const match = await bcrypt.compare(
      req.body.password,
      candidate.user_password
    );
    if (!match) return res.json({ message: "Wrong email or password" });
      // Я хотел в JWT закинуть объект candidate, но JWT выдал ошибку что candidate должен быть простым объектом
      // поэтому я закинул email
    const token = jwt.sign({ email: candidate.email }, process.env.JWT_SECRET);

    const { user_password, admin, ...user } = candidate.dataValues;
    res.json({
      status: "success",
      data: { token, user },
    });
  } catch (e) {
    console.log(e);
  }
};
