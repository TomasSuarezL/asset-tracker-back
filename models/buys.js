"use strict";

module.exports = (sequelize, DataTypes) => {
  const Buys = sequelize.define(
    "buys",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      ticker: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
      buyDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      target: DataTypes.DECIMAL,
      stopLoss: DataTypes.DECIMAL,
      fee: { type: DataTypes.DECIMAL, allowNull: false },
      state_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "buy_state",
          key: "state_id"
        }
      },
      type_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "buy_types",
          key: "type_id"
        }
      },
      currency_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "currencies",
          key: "currency_id"
        }
      },
      asset_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "asset_types",
          key: "asset_id"
        }
      }
    },
    {
      hooks: {
        beforeUpdate: (buy, ops) => {
          buy.ticker = buy.ticker.toUpperCase();
        }
      }
    }
  );

  Buys.associate = models => {
    Buys.belongsTo(models.buy_state, { foreignKey: "state_id", as: "state" });
    Buys.belongsTo(models.buy_types, { foreignKey: "type_id", as: "type" });
    Buys.belongsTo(models.asset_types, { foreignKey: "asset_id", as: "asset" });
    Buys.belongsTo(models.currency, { foreignKey: "currency_id", as: "currency" });
    Buys.hasMany(models.sells, { foreignKey: "buy_id", as: "sells" });
  };

  return Buys;
};
