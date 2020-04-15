const Users = require("../../models/users");

module.exports.getUsers = async function (req, res) {
  try {
    const users = await Users.findAll();
    res.json({ users });
  } catch (e) {
    console.log(e);
  }
};

module.exports.getUserById = async function (req, res) {
  try {
    console.log(typeof req.params.id);
    // const users = await Users.findByPk();
    res.json({ ok: "ok" });
  } catch (e) {
    console.log(e);
  }
};
