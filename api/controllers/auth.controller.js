const Users = require("../../database/models/users");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ResponseSender = require("../../helpers/responseSender");

const {
  WrongParametersError,
  UnprocessableEntity,
} = require("../../helpers/errors");

const {
  getResetPasswordLayout,
  getConfirmRegisterLayout,
} = require("../../helpers/mails");

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
    const token = jwt.sign({ body: req.body }, process.env.JWT_SECRET, {
      expiresIn: 3600 * 30 * 1000,
    });

    await mailer.sendMail(getConfirmRegisterLayout(req.body.email, token));
    return new ResponseSender(req, res).send({
      data: {
        message:
          "To continue registration, go to the specified mailing address in next 30 min",
      },
    });
  } catch (e) {
    next(e);
  }
};
module.exports.confirm = async function (req, res, next) {
  try {
    const { body } = jwt.verify(req.params.token, process.env.JWT_SECRET);

    if (!body) {
      throw new WrongParametersError({ message: "Wrong data" });
    }
    const candidate = await Users.findOne({ where: { email: body.email } });

    if (candidate) {
      throw new WrongParametersError({ message: "user already exist" });
    }

    const user = await Users.createUser(body);

    if (!user) {
      throw new WrongParametersError({ message: "Wrong data" });
    }
    return new ResponseSender(req, res).send({
      code: 201,
      data: {
        message: "user successfully registered",
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.getLoginUser = async function (req, res, next) {
  try {
    const candidate = await Users.findByPk(req.user.id);

    const options = !req.remember ? { expiresIn: 3600 * 30 * 1000 } : null;

    const token = jwt.sign(
      { user: req.user, remember: !!options },
      process.env.JWT_SECRET,
      options
    );

    await candidate.update({ token });

    return new ResponseSender(req, res).send({
      data: {
        user: req.user,
        token,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports.login = async function (req, res, next) {
  try {
    console.log(123)
    const candidate = await Users.findOne({ where: { email: req.body.email } });

    if (!candidate) {
      throw new WrongParametersError({ message: "Wrong email or password" });
    }

    const match = await candidate.validPassword(req.body.password);

    if (!match) {
      throw new WrongParametersError({ message: "Wrong email or password" });
    }
    const {
      // eslint-disable-next-line no-unused-vars
      dataValues: { password, token, ...rest },
    } = candidate;

    const options = !req.body.remember ? { expiresIn: 3600 * 30 * 1000 } : null;

    const responseToken = jwt.sign(
      { user: rest, remember: !!options },
      process.env.JWT_SECRET,
      options
    );

    await candidate.update({ token: responseToken });

    return new ResponseSender(req, res).send({
      data: {
        user: rest,
        token: responseToken,
      },
    });
  } catch (e) {
    next(e);
  }
};
module.exports.logout = async function (req, res, next) {
  try {
    const candidate = await Users.findByPk(req.user.id);
    await candidate.update({ token: null });
    return new ResponseSender(req, res).send({
      data: {
        message: "you are logout",
      },
    });
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
      return new ResponseSender(req, res).send({
        data: {
          message: "To recover your password, go to the email",
        },
      });
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
      return new ResponseSender(req, res).send({
        data: {
          message: "password was restored",
        },
      });
    }
    throw new WrongParametersError("params is not valid");
  } catch (e) {
    next(e);
  }
};
