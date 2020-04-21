const { BaseError } = require("../helpers/errors");
// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  if (err instanceof BaseError) {
    const result = {
      code: err.code || 500,
      status: "error",
      data: {
        message: err.message || "something wont wrong",
      },
    };
    return res.status(result.code).json(result);
  }
  console.error(err);
  return res.status(500).json({ message: "server error" });
}
module.exports = errorMiddleware;
