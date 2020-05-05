class ResponseBuilder {
  constructor({ code = 200, data }) {
    this.code = code;
    this.status = "success";
    this.data = data;
  }
}
module.exports = ResponseBuilder;
