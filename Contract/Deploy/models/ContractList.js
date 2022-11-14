"use strict";
const { DataTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize("ContractList", "root", "root", {
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

const ContractList = sequelize.define("ContractList", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  abi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = {
  ContractList,
  sequelize,
};
