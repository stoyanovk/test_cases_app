const { BaseError } = require("../helpers/errors");
const ResponseBuilder = require("../helpers/responseBuilder");
// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.json(
      new ResponseBuilder({
        code: err.code || 500,
        status: "error",
        data: { message: err.message || "something wont wrong" },
      })
    );
  }
  
  console.error(err);

  return res.json(
    new ResponseBuilder({
      code: 500,
      status: "error",
      data: { message: "server error" },
    })
  );
}
module.exports = errorMiddleware;
