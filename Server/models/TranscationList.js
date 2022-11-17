"use strict";
import { DataTypes } from "sequelize";
import { sequelize } from "./HeroMetaData.js";

export const transcationListSequelize = new Sequelize(
  "TransactionOwnerList",
  "root",
  "root",
  {
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
  }
);

export const TransactionOwnerList = transcationListSequelize.define(
  "TransactionOwnerList",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    owner: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }
);

export const TransactionList = transcationListSequelize.define(
  "TransactionList",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    from: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    to: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
    },
  }
);

TransactionOwnerList.hasMany(TransactionList, {
  foreignKey: {
    name: "owner",
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
