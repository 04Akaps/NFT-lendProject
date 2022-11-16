"use strict";
import { DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize("HeroMetaData", "root", "root", {
  define: {
    freezeTableName: true,
  },
  port: "3306",
  dialect: "mysql",
  pool: {
    max: 5,
    mint: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const HeroMetaData = sequelize.define(
  "HeroMetaData",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    level: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    grade: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
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

export const HeroMetaDataImage = sequelize.define("HeroMetaDataImage", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
});

HeroMetaData.hasOne(HeroMetaDataImage, {
  foreignKey: {
    name: "tokenId",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
