const Users = require("../../models/users");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  getRegisterMail,
  getResetPasswordMail,
} = require("../../helpers/mails");
const options = {
  auth: {
    api_key: process.env.MAIL_API_KEY,
  },
};

const mailer = nodemailer.createTransport(sgTransport(options));

module.exports.register = async function (req, res) {
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
    await mailer.sendMail(getRegisterMail(req.body.email));
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
      expiresIn: 3600 * 24 * 1000,
    });

    res.json({
      status: "success",
      data: { token, user: rest },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.reset = async function (req, res) {
  try {
    console.log(req.body.email);
    const candidate = await Users.findOne({ where: { email: req.body.email } });
    console.log(candidate);
    if (candidate) {
      const token = jwt.sign(
        { email: candidate.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 1800 * 1000,
        }
      );
      return res.json({ token });
      res.json({ message: "To recover your password, go to the email" });
      await mailer.sendMail(getResetPasswordMail(req.body.email, token));
    }

    return res.json({ message: "user with this email is not exist" });
  } catch (e) {
    console.log(e);
  }
};

module.exports.restorePassword = async function (req, res) {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    if (decoded.email) {
      const password = await bcrypt.hash(req.body.password, 10);
      await Users.update(
        { user_password: password },
        { where: { email: decoded.email } }
      );
      res.json({ message: "password was restored" });
    }
  } catch (e) {
    console.log(e);
    res.json({ errors: "something want wrong" });
  }
};
