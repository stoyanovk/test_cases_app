const Sequelize = require("sequelize");
const sequelize = require("../database");
const { NotFoundError } = require("../../helpers/errors");

const Tokens = sequelize.define("tokens", {
  id: {
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  token: Sequelize.STRING(1234),
});
Tokens.logout = async function (token) {
  const isLogout = await Tokens.destroy({ where: { token } });
  if (!isLogout) {
    throw new NotFoundError("token is not found");
  }
  return isLogout;
};
module.exports = Tokens;
