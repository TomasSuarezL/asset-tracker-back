const request = require("supertest");
const assert = require('assert');

const app = require("../app");
const { buys, buy_state } = require("../models");

describe("Buys API Tests", () => {
  before(async () => {
    console.log("Running in : " + process.env.NODE_ENV);
    // Buys.destroy({
    //   where: {}
    // });
    try {
      buy = await buys.create(
        {
          ticker: "AGro",
          price: 13,
          quantity: 50,
          fee: 2,
          target: 20,
          stopLoss: 10,
          state_id: 2,
          type_id: 1,
          currency_id: 1,
          asset_id: 1
        },
        {}
      );
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
        asset: "fufu"
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
        ticker: "pamp"
      }

      request(app).post("/buys").send(testBuy).set("Accept", "application/json")
        .end( (err,res) => {
          request(app)
            .put("/buys/"+res.body.id)
            .send(testUpdate)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end( (err,res) => {
              console.log(res.body);
              assert(res.body.ticker,"PAMP");
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
        ticker: "pamp"
      }

      request(app).post("/buys").send(testBuy).set("Accept", "application/json")
        .end( (err,res) => {
          request(app)
            .put("/buys/"+res.body.id)
            .send(testUpdate)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end( (err,res) => {
              console.log(res.body);
              assert(res.body.ticker,"PAMP");
              done();
            });
        });
    });
  });

});
