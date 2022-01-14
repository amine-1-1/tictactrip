let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("POST /api/justify", () => {
  it("it should return an error if there is no Token", (done) => {
    chai
      .request(server)
      .post("/api/justify")
      .set('Content-Type', "text/plain")
      .send("This is an example text justification.")
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.be.eql("Not authorize to access");
        done();
      });
  });

  it("it should request token, send text and recieves justified text", (done) => {
    chai
      .request(server)
      .post("/api/token")
      .send({
        email: "amine@gmail.com"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        let token = res.body.token;
        chai
          .request(server)
          .post("/api/justify")
          .set('Content-Type', "text/plain")
          .set('Authorization', `Bearer ${token}`)
          .send("this is an example text justification.")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            done();
          })
      });
  });
});