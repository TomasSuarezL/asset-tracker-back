const request = require("supertest");
const assert = require("assert");

const app = require("../app");
const { buys, buy_state } = require("../models");

let buyId;

describe("Buys API Tests", () => {
  before(async () => {
    console.log("Running in : " + process.env.NODE_ENV);
    const testBuy = {
      ticker: "cres",
      price: 65,
      quantity: 50,
      fee: 11,
      state: "Open",
      type: "Scalp",
      currency: "ARS",
      asset: "Stock"
    };

    const buy = await request(app)
      .post("/buys")
      .send(testBuy)
      .set("Accept", "application/json");

    buyId = buy.body.id;
    console.log(buyId);
    try {
    } catch (error) {
      console.log(error);
    }
  });

  describe("POST /sells", () => {
    it("should post a Buy with the required fields from body", function(done) {
      const testSell = {
        sell_price: 120,
        sell_quantity: 50,
        sell_fee: 26,
        sell_reason: "Sell Tests",
        buy_id: buyId
      };

      request(app)
        .post("/sells")
        .send(testSell)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
          assert(res.body.sell_price, 120);
          assert(res.body.buy_id, buyId);
          done();
        });
    });
    it("should NOT post a Buy without the required fields from body", function(done) {
      const testSell = {};

      request(app)
        .post("/sells")
        .send(testSell)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });
  });
});
