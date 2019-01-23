"use strict";
module.exports = (sequelize, DataTypes) => {
  const BuyTypes = sequelize.define(
    "buy_types",
    {
      description: DataTypes.STRING
    },
    { timestamps: false, underscore: true }
  );
  BuyTypes.associate = function(models) {
    // associations can be defined here
  };
  return BuyTypes;
};
