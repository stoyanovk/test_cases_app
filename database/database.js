const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize(
  process.env.NODE_ENV !== "production" ? process.env.DB_DB : process.env.DB,
  process.env.NODE_ENV !== "production"
    ? process.env.DB_USER
    : process.env.USER,
  process.env.NODE_ENV !== "production"
    ? process.env.DB_PASSWORD
    : process.env.PASSWORD,
  {
    host:
      process.env.NODE_ENV !== "production"
        ? process.env.DB_HOST
        : process.env.HOST,
    dialect: "mysql",
  }
);
module.exports = sequelize;
