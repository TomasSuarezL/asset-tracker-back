"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sells = sequelize.define(
    "sells",
    {
      sell_price: { type: DataTypes.DECIMAL, allowNull: false },
      sell_quantity: { type: DataTypes.INTEGER, allowNull: false },
      sell_reason: DataTypes.STRING,
      sell_date: DataTypes.DATE,
      sell_fee: { type: DataTypes.DECIMAL, allowNull: false }
    },
    {
      timestamps: true,
      underscored: true
    }
  );
  Sells.associate = function(models) {
    // associations can be defined here
    Sells.belongsTo(models.buys);
  };
  return Sells;
};
