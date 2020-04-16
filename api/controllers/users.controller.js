const Users = require("../../models/users");
const { NotFoundError } = require("../../helpers/errors");

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
