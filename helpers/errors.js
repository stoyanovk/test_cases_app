class BaseError extends Error {
  constructor(params = {}) {
    super(params.message);
    this.code = 500;
    this.name = this.constructor.name;
    this.message = params.message || "something was heppen";
    this.data = params.data;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends BaseError {
  constructor(params = {}) {
    super(params.message);
    this.code = 404;
    this.message = params.message || "Not Found";
  }
}

class UnauthorizedError extends BaseError {
  constructor(params = {}) {
    super(params.message);
    this.code = 401;
    this.message = params.message || "Permission denied";
  }
}
class BadRequest extends BaseError {
  constructor(params = {}) {
    super(params.message);
    this.code = 400;
    this.message = params.message || "Permission denied";
  }
}
class ForbiddenError extends BaseError {
  constructor(params = {}) {
    super(params.message);
    this.code = 403;
    this.message = params.message || "Permission denied";
  }
}

class WrongParametersError extends BaseError {
  constructor(params = {}) {
    super(params.message);
    this.code = 400;
    this.message = params.message || "Wrong parameters";
  }
}

class WrongData extends BaseError {
  constructor(params = {}) {
    super(params.message);
    this.code = 400;
    this.message = params.message || "Wrong data";
  }
}

module.exports = {
  BaseError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  WrongParametersError,
  WrongData,
  BadRequest,
};
