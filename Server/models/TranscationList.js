"use strict";
import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "./TranscationList.js";

export const ContractList = sequelize.define("ContractList", {
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
