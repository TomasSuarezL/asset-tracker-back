const request = require("supertest");
const assert = require("assert");

const app = require("../app");

describe("Buys API Tests", () => {
  before(async () => {
    console.log("Running in : " + process.env.NODE_ENV);
    // Buys.destroy({
    //   where: {}
    // });
    try {
    } catch (error) {
      console.log(error);
    }
  });

  describe("POST /buys", () => {
    it("should post a Buy with the required fields from body", function(done) {
      const testBuy = {
        ticker: "ggal",
        price: 120,
        quantity: 50,
        fee: 26,
        state: "Open",
        type: "Scalp",
        currency: "ARS",
        asset: "Stock"
      };

      request(app)
        .post("/buys")
        .send(testBuy)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          assert(res.body.ticker, "GGAL");
          done();
        });
    });

    it("should NOT post a Buy without the required fields from body - ticker", function(done) {
      const testBuy = {
        price: 120,
        quantity: 50,
        fee: 26,
        state: "Open",
        type: "Scalp",
        currency: "ARS",
        asset: "funD"
      };

      request(app)
        .post("/buys")
        .send(testBuy)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
    it("should NOT post a Buy without the required fields from body - empty", function(done) {
      const testBuy = {};

      request(app)
        .post("/buys")
        .send(testBuy)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });

    it("should NOT post a Buy without the required fields from body - bad format of numbers", function(done) {
      const testBuy = {
        ticker: 55,
        price: "fafa",
        quantity: "fafa",
        fee: "fafa"
      };

      request(app)
        .post("/buys")
        .send(testBuy)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(500, done);
    });
  });

  describe("GET /buys", () => {
    it("should GET all buys on DB", done => {
      request(app)
        .get("/buys")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("PUT /buys/:id", () => {
    it("should update the buy with the id sent by param, with the object sent in body, only ticker", done => {
      const testBuy = {
        ticker: "supv",
        price: 65,
        quantity: 50,
        fee: 20,
        state: "Open",
        type: "Scalp",
        currency: "ARS",
        asset: "Stock"
      };
      const testUpdate = {
        ticker: "pamp"
      };

      request(app)
        .post("/buys")
        .send(testBuy)
        .set("Accept", "application/json")
        .end((err, res) => {
          request(app)
            .put("/buys/" + res.body.id)
            .send(testUpdate)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              console.log(res.body);
              assert.equal(res.body.ticker, "PAMP");
              done();
            });
        });
    });
    it("should update the buy with the id sent by param, with the object sent in body", done => {
      const testBuy = {
        ticker: "supv",
        price: 65,
        quantity: 50,
        fee: 20,
        state: "Open",
        type: "Scalp",
        currency: "ARS",
        asset: "Stock"
      };
      const testUpdate = {
        price: 66,
        ticker: "ts",
        quantity: 20,
        fee: 25,
        state: "Closed",
        type: "Swing",
        currency: "USD",
        asset: "Fund",
        stop_loss: 45
      };

      request(app)
        .post("/buys")
        .send(testBuy)
        .set("Accept", "application/json")
        .end((err, res) => {
          request(app)
            .put("/buys/" + res.body.id)
            .send(testUpdate)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              console.log(res.body);
              assert.equal(res.body.ticker, "TS");
              assert.equal(res.body.price, 66);
              assert.equal(res.body.state_id, 2);
              assert.equal(res.body.currency_id, 2);
              assert.equal(res.body.stop_loss, 45);
              done();
            });
        });
    });

    it("should not update the buy with the id sent by param, with the object sent in body incorrect - ticker", done => {
      const testBuy = {
        ticker: "pamp",
        price: 60,
        quantity: 50,
        fee: 20,
        state: "Open",
        type: "Scalp",
        currency: "ARS",
        asset: "Stock"
      };
      const testUpdate = {
        price: 66,
        ticker: 2,
        quantity: 20,
        fee: 25,
        state: "Closed",
        type: "Swing",
        currency: "USD",
        asset: "Fund",
        stop_loss: 45
      };

      request(app)
        .post("/buys")
        .send(testBuy)
        .set("Accept", "application/json")
        .end((err, res) => {
          request(app)
            .put("/buys/" + res.body.id)
            .send(testUpdate)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400, done);
        });
    });
  });

  describe("DELETE /buys/:id", () => {
    it("should delete the buy with the sent ID", done => {
      const testBuy = {
        ticker: "apbr",
        price: 500,
        quantity: 20,
        fee: 30,
        state: "Open",
        type: "Scalp",
        currency: "ARS",
        asset: "Stock"
      };

      request(app)
        .post("/buys")
        .send(testBuy)
        .set("Accept", "application/json")
        .end((err, res) => {
          request(app)
            .delete("/buys/" + res.body.id)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              assert.equal(res.body.rows, 1);
              done();
            });
        });
    });
    it("should NOT delete the buy with the sent ID not existing", done => {
      request(app)
        .delete("/buys/99999")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.rows, 0);
          done();
        });
    });
  });

  describe("GET /buys/:id", () => {
    it("should get the buy with the sent ID existing", done => {
      const testBuy = {
        ticker: "apbr",
        price: 500,
        quantity: 20,
        fee: 30,
        state: "Open",
        type: "Scalp",
        currency: "ARS",
        asset: "Stock"
      };

      request(app)
        .post("/buys")
        .send(testBuy)
        .set("Accept", "application/json")
        .end((err, res) => {
          request(app)
            .get("/buys/" + res.body.id)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              assert.equal(res.body.ticker, "APBR");
              done();
            });
        });
    });
  });
});
