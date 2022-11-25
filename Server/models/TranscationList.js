"use strict";
import { DataTypes, Sequelize } from "sequelize";

export const transcationListSequelize = new Sequelize(
  "TransactionSequelize",
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
      type: DataTypes.STRING,
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
  },
});
