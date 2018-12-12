"use strict";
module.exports = (sequelize, DataTypes) => {
  const Buys = sequelize.define(
    "Buys",
    {
      ticker: DataTypes.STRING,
      buyDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      price: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER,
      target: DataTypes.DECIMAL,
      stopLoss: DataTypes.DECIMAL,
      fee: DataTypes.DECIMAL
    },
    {}
  );
  Buys.associate = function(models) {
    // associations can be defined here
    Buys.hasOne(models.BuyState, { foreignKey: "id_state" });
  };
  return Buys;
};
