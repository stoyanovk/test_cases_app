const { body } = require("express-validator");

const editUserValidator = [
  body("user_name").isAlpha().isByteLength({ min: 2 }),
  body("password").isByteLength({ min: 6, max: 30 }),
  body("confirm", "password must be equal").custom((value, { req }) => {
    if (value !== req.body.password) {
      new Error("confirm is not equal password");
      return false;
    }
    return true;
  }),
];
module.exports = { editUserValidator };
