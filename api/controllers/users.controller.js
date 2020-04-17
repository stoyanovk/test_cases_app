const Users = require("../../models/users");
const { NotFoundError } = require("../../helpers/errors");
const bcrypt = require("bcrypt");
module.exports.getUsers = async function (req, res, next) {
  try {
    const users = await Users.findAll();
    res.json({ users });
  } catch (e) {
    next(new NotFoundError());
  }
};

module.exports.getUserById = async function (req, res, next) {
  try {
    const user = await Users.findByPk(req.params.id);
    res.json({ user });
  } catch (e) {
    next(new NotFoundError());
  }
};
module.exports.editUser = async function (req, res, next) {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      next(new NotFoundError());
    }
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await user.update({
      user_name: req.body.user_name,
      password: newPassword,
    });
    const {
      dataValues: {
        password: { pass },
        ...rest
      },
    } = user;

    res.json({ user: rest });
  } catch (e) {
    next(new Error(e));
  }
};
module.exports.deleteUser = async function (req, res, next) {
  try {
    await Users.destroy({ where: { id: req.params.id } });
    res.json({ message: "user deleted successfully" });
  } catch (e) {
    next(new NotFoundError());
  }
};
