module.exports = {
  development: {
    username: "root",
    password: '12345678',
    database: "test-case-app",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.USER,
    host: process.env.HOST,
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
