"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Buys", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticker: {
        type: Sequelize.STRING
      },
      buyDate: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.DECIMAL
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      target: {
        type: Sequelize.DECIMAL
      },
      stopLoss: {
        type: Sequelize.DECIMAL
      },
      fee: {
        type: Sequelize.DECIMAL
      },
      AssetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "AssetTypes", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      StateID: {
        type: Sequelize.INTEGER,
        references: {
          model: "BuyState", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      TypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "BuyTypes", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      CurrencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Currencies", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Buys");
  }
};
