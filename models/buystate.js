"use strict";

module.exports = (sequelize, DataTypes) => {
  const BuyState = sequelize.define(
    "buy_state",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      description: DataTypes.STRING
    },
    {
      timestamps: true,
      freezeTableName: true
    }
  );

  BuyState.associate = models => {
    //BuyState.hasMany(models.buys, { foreignKey: "id", as: "state_id" });
  };
  return BuyState;
};
