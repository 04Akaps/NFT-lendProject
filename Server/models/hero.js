"use strict";
const { Model } = require("sequelize");

// npx sequelize-cli model:generate --name Hero --attributes hash:string,from:string
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hero.init(
    {
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Hero",
    }
  );
  return Hero;
};
