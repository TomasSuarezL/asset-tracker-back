"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert(
        "BuyState",
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
        "AssetTypes",
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
        "BuyTypes",
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
        "Currencies",
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
    return Promise.all([queryInterface.bulkDelete("BuyState", null, {}), queryInterface.bulkDelete("BuyTypes", null, {}), queryInterface.bulkDelete("AssetTypes", null, {}),queryInterface.bulkDelete("Currencies", null, {})]);
  }
};
