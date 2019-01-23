"use strict";
module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define(
    "currency",
    {
      description: DataTypes.STRING
    },
    {
      timestamps: false,
      underscore: true
    }
  );
  Currency.associate = function(models) {
    // associations can be defined here
    //Currency.hasMany(models.Buys);
  };
  return Currency;
};
