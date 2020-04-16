const errors = require("../helpers/errors");

function errorMiddleware(err, req, res, next) {
  let tmpError = err;

  if (!(err instanceof errors.BaseError)) {
    tmpError = new errors.BaseError({
      message: err.message,
    });
    tmpError.stack = err.stack;
  }

  const result = {
    code: tmpError.code || 500,
    status: "error",
    data: tmpError.data,
  };

  res.status(result.code).json(result);
}
module.exports = errorMiddleware;
