const Users = require("../../models/users");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports.createUser = async function (req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const candidate = await Users.findOne({ where: { email: req.body.email } });

    if (candidate) {
      return res.status(226).json({ message: "user already exist" });
    }
    const user = await Users.createUser(req.body);

    res.status(201).json({ status: "success", data: { user } });
  } catch (e) {
    console.log(e);
  }
};

module.exports.login = async function (req, res) {
  try {
    const candidate = await Users.findOne({ where: { email: req.body.email } });

    if (!candidate) return res.json({ message: "Wrong email or password" });

    const match = candidate.validPassword(req.body.password);

    if (!match) return res.json({ message: "Wrong email or password" });

    const {
      dataValues: { user_password, ...rest },
    } = candidate;
    const token = jwt.sign({ user: rest }, process.env.JWT_SECRET, {
      notBefore: "24 h",
    });

    res.json({
      status: "success",
      data: { token, user: rest },
    });
  } catch (e) {
    console.log(e);
  }
};
