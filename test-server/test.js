var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:express-server");

// Unit Test

describe("Webapp Status",function(){

  // Test 1 - HTTP status
  it("Expect HTTP status 200",function(done){
    server
    .get("/")
    .expect("Content-type",/text/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  // Test 2 - Control Test, Always TRUE
  it("Mocha Control Test - this will always pass",function(done){
      (1).should.be.exactly(1).and.be.a.Number();
        done();
  });

});
