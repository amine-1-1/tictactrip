let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);



describe("POST /api/token", () => {
  it("it should return a token if credentials are valid", (done) => {
    chai
      .request(server)
      .post("/api/token")
      .send({
        email: "amine@gmail.com"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token");
        done();
      });
  });

  it("it should not return a token if credentials are invalid", (done) => {
    chai
      .request(server)
      .post("/api/token")
      .send({
        email: "user2"
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property('error');
        res.body.error.should.be.eql("Invalid Credentials");
        done();
      });
  });
});