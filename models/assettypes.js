"use strict";
module.exports = (sequelize, DataTypes) => {
  const AssetTypes = sequelize.define(
    "AssetTypes",
    {
      description: DataTypes.STRING
    },
    {}
  );
  AssetTypes.associate = function(models) {
    // associations can be defined here
  };
  return AssetTypes;
};
