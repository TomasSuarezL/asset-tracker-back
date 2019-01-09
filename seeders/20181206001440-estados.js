"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert(
        "buy_state",
        [
          {
            description: "Open"
          },
          {
            description: "Closed"
          },
          {
            description: "Partial"
          }
        ],
        {}
      ),
      queryInterface.bulkInsert(
        "asset_types",
        [
          {
            description: "Cryptocurrency"
          },
          {
            description: "Stock"
          },
          {
            description: "Bond"
          },
          {
            description: "Fund"
          }
        ],
        {}
      ),
      queryInterface.bulkInsert(
        "buy_types",
        [
          {
            description: "Scalp"
          },
          {
            description: "Swing"
          },
          {
            description: "Medium Term"
          },
          {
            description: "Long Term"
          }
        ],
        {}
      ),
      queryInterface.bulkInsert(
        "currencies",
        [
          {
            description: "ARS"
          },
          {
            description: "USD"
          }
        ],
        {}
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.bulkDelete("buy_state", null, {}), queryInterface.bulkDelete("buy_types", null, {}), queryInterface.bulkDelete("asset_types", null, {}),queryInterface.bulkDelete("currencies", null, {})]);
  }
};
