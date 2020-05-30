const Users = require("../../database/models/users");
const { NotFoundError } = require("../../helpers/errors");
const bcrypt = require("bcrypt");
const ResponseBuilder = require("../../helpers/responseBuilder");

module.exports.getUsers = async function (req, res, next) {
  try {
    const users = await Users.findAll();
    if (users === null) {
      throw new NotFoundError({ message: "User is not found" });
    }
    return res.json(new ResponseBuilder({ data: { token: req.token, users } }));
  } catch (e) {
    next(e);
  }
};



module.exports.getUserById = async function (req, res, next) {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user === null) {
      throw new NotFoundError({ message: "User is not found" });
    }
    return res.json(new ResponseBuilder({ data: { token: req.token, user } }));
  } catch (e) {
    next(e);
  }
};
module.exports.editUser = async function (req, res, next) {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user === null) {
      throw new NotFoundError({ message: "User is not found" });
    }

    const newPassword = await bcrypt.hash(req.body.password, 10);
    await user.update({
      user_name: req.body.user_name,
      password: newPassword,
    });
    const {
      dataValues: {
        // eslint-disable-next-line no-unused-vars
        password: { pass },
        ...rest
      },
    } = user;

    return res.json(
      new ResponseBuilder({ data: { token: req.token, user: rest } })
    );
  } catch (e) {
    next(e);
  }
};
module.exports.deleteUser = async function (req, res, next) {
  try {
    const isDeleted = await Users.destroy({ where: { id: req.params.id } });
    if (!isDeleted) {
      throw new NotFoundError({ message: "User is not found" });
    }
    return res.json(
      new ResponseBuilder({
        data: { token: req.token, message: "user deleted successfully" },
      })
    );
  } catch (e) {
    next(e);
  }
};
