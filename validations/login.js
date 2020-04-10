const { body } = require("express-validator");
const loginValidations = [
  body("email").isEmail(),
  body("password").isByteLength({ min: 6, max: 30 }),
];
module.exports = { loginValidations };
