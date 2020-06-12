const { BaseError } = require("../helpers/errors");
const ResponseSender = require("../helpers/responseSender");

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  if (err instanceof BaseError) {
    return new ResponseSender(req, res).send({
      code: err.code || 500,
      status: "error",
      data: { message: err.message || "something wont wrong" },
    });
  }

  console.error(err);
  return new ResponseSender(req, res).send({
    code: 500,
    status: "error",
    data: { message: "server error" },
  });
}
module.exports = errorMiddleware;
