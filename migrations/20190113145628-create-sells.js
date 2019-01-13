"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sells", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sell_price: {
        type: Sequelize.DECIMAL
      },
      sell_quantity: {
        type: Sequelize.INTEGER
      },
      sell_reason: {
        type: Sequelize.STRING
      },
      sell_date: {
        type: Sequelize.DATE
      },
      sell_fee: {
        type: Sequelize.DECIMAL
      },
      buy_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "buys", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("sells");
  }
};
