"use strict";
import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "./TranscationList.js";

export const TransactionOwnerList = sequelize.define("TransactionOwnerList", {
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
});

export const TransactionList = sequelize.define("TransactionList", {
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
});

TransactionOwnerList.hasMany(TransactionList, {
  foreignKey: {
    name: "owner",
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
