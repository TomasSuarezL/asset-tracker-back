"use strict";
module.exports = (sequelize, DataTypes) => {
  const BuyTypes = sequelize.define(
    "BuyTypes",
    {
      description: DataTypes.STRING
    },
    {}
  );
  BuyTypes.associate = function(models) {
    // associations can be defined here
  };
  return BuyTypes;
};
