class ResponseSender {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  send({ code = 200, status = "success", data }) {
    this.res.status(code);
    return this.res.json({
      status,
      data: {
        token: this.req.token || "",
        ...data,
      },
    });
  }
}
module.exports = ResponseSender;
