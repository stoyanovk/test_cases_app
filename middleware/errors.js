// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  const result = {
    code: err.code || 500,
    status: "error",
    data: {
      message: err.message || "something wont wrong",
    },
  };

  res.status(result.code).json(result);
}
module.exports = errorMiddleware;
