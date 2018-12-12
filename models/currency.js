"use strict";
module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define(
    "Currency",
    {
      description: DataTypes.STRING
    },
    {
      timestamps: true
    }
  );
  Currency.associate = function(models) {
    // associations can be defined here
    Currency.hasMany(models.Buys);
  };
  return Currency;
};
