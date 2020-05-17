class ResponseBuilder {
  constructor({ code = 200, status = "success", data }) {
    this.code = code;
    this.status = status;
    this.data = data;
  }
}
module.exports = ResponseBuilder;
