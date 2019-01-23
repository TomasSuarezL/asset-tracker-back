"use strict";
module.exports = (sequelize, DataTypes) => {
  const AssetTypes = sequelize.define(
    "asset_types",
    {
      description: DataTypes.STRING
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  AssetTypes.associate = function(models) {
    // associations can be defined here
  };
  return AssetTypes;
};
