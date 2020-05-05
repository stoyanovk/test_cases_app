const Users = require("../../database/models/users");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ResponseBuilder = require("../../helpers/responseBuilder");

const {
  WrongParametersError,
  UnprocessableEntity,
} = require("../../helpers/errors");

const {
  getSuccessRegisterLayout,
  getResetPasswordLayout,
} = require("../../helpers/mails");

const production = process.env.NODE_ENV === "production";

const options = {
  auth: {
    api_key: process.env.MAIL_API_KEY,
  },
};

const mailer = nodemailer.createTransport(sgTransport(options));

module.exports.register = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new UnprocessableEntity({ message: errors.array()[0].msg });
    }

    const candidate = await Users.findOne({ where: { email: req.body.email } });

    if (candidate) {
      throw new WrongParametersError({ message: "user already exist" });
    }
    const user = await Users.createUser(req.body);
    if (production) {
      await mailer.sendMail(getSuccessRegisterLayout(req.body.email));
    }
    res.json(new ResponseBuilder({ code: 201, data: { user } }));
  } catch (e) {
    next(e);
  }
};

module.exports.login = async function (req, res, next) {
  try {
    const candidate = await Users.findOne({ where: { email: req.body.email } });

    if (!candidate) {
      throw new WrongParametersError({ message: "Wrong email or password" });
    }

    const match = candidate.validPassword(req.body.password);

    if (!match) {
      throw new WrongParametersError({ message: "Wrong email or password" });
    }
    const {
      dataValues: { password, ...rest },
    } = candidate;

    const options = production ? { expiresIn: 3600 * 24 * 1000 } : {};
    const token = jwt.sign({ user: rest }, process.env.JWT_SECRET, options);

    res.json(new ResponseBuilder({ data: { token, user: rest } }));
  } catch (e) {
    next(e);
  }
};

module.exports.resetPassword = async function (req, res, next) {
  try {
    const candidate = await Users.findOne({ where: { email: req.body.email } });
    if (candidate) {
      const token = jwt.sign(
        { email: candidate.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 1800 * 1000,
        }
      );
      await mailer.sendMail(getResetPasswordLayout(req.body.email, token));
      return res.json(
        new ResponseBuilder({
          data: { message: "To recover your password, go to the email" },
        })
      );
    }

    throw new WrongParametersError({
      message: "user with this email is not exist",
    });
  } catch (e) {
    next(e);
  }
};

module.exports.restorePassword = async function (req, res, next) {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    if (decoded.email) {
      const password = await bcrypt.hash(req.body.password, 10);
      await Users.update({ password }, { where: { email: decoded.email } });
      return res.json(
        new ResponseBuilder({
          data: { message: "password was restored" },
        })
      );
    }
    throw new WrongParametersError("params is not valid");
  } catch (e) {
    next(e);
  }
};
