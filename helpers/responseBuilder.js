class ResponseBuilder {
  constructor(response) {
    this.response = response;
    return this;
  }
  build({ code = 200, status = "success", data }) {
    this.response.status(code);
    return this.response.json({
      data,
      token: this.response.token || "",
      status,
    });
  }
}
module.exports = ResponseBuilder;
