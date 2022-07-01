"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      to: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      tokenId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
