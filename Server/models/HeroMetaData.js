"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize("HeroMetaData", "root", "root", {
  define: {
    freezeTableName: true,
  },
  port: "3306",
  dialect: "mysql",
});

const HeroMetaData = sequelize.define(
  "HeroMetaData",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tokenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attributes: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "HeroMetaData",
    timestamps: false,
    deletedAt: "timeDestroyed",
  }
);
