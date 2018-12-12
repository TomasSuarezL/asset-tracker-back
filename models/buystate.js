"use strict";
module.exports = (sequelize, DataTypes) => {
  const BuyState = sequelize.define(
    "BuyState",
    {
      description: DataTypes.STRING
    },
    {
      timestamps: true
    }
  );
  BuyState.associate = function(models) {
    // associations can be defined here
    BuyState.hasMany(models.Buys);
  };
  return BuyState;
};
