class ResponseBuilder {
  constructor(response) {
    this.response = response;
    return this;
  }
  build({ code = 200, status = "success", data }) {
    this.response.status(code);
    return this.response.json({
      status,
      data: {
        token: this.response.req.token || "",
        ...data,
      },
    });
  }
}
module.exports = ResponseBuilder;
